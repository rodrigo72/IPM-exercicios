<script>
import { Jogo } from "../models/jogo";
import { isProxy, toRaw } from 'vue';

export default {
  data() {
    return {
      jogo: new Jogo(),
      running: false,
      simulation: {}
    }
  },
  methods: {
    jogar(coluna) {
      this.jogo.jogar(coluna);
    },
    async simulate() {
      /* Efetue aqui o código para executar a simulação.
         A simulação só deve ser efetuada se a variável
         simulation não for um objeto vazio e se houver
         jogadas a mostrar */

      if (this.running) { return; }
      this.running = true;
      this.jogo.reset();

      let simulation = this.simulation;
      if (isProxy(this.simulation)) {
        simulation = toRaw(this.simulation);
        console.log(simulation)
      }

      this.jogo.jogadorAJogar = simulation.startPlayer;
      for (let i = 0; i < simulation.plays.length; i++) {
        await this.delay(500);
        this.jogar(simulation.plays[i]);
      }
      this.running = false;
    },
    delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    },
    getSimulation() {
      /* Insira aqui o código para obter a 
         simulação do json-server */
      fetch('http://localhost:3000/simulation/1')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Erro ao obter a simulação');
          }
        })
        .then(data => {
          this.simulation = {
            startPlayer: data.startPlayer,
            plays: data.plays
          }
        })
        .catch(error => console.log(error));
      
    }
  },
  created() {
    this.getSimulation();
  }
}
</script>

<template>
<div class="title">Simular Último Jogo</div>
  <Tabuleiro :jogo="jogo" />
  <div class="button-container" @click="simulate()">
    <Button :disabled="running">Simular</Button>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  margin: 40px 0;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>