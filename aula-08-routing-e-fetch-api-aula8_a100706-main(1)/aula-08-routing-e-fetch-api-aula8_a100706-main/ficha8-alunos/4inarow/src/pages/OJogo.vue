<script>
import { Jogo } from "../models/jogo";
import { ResultadoJogada } from "../models/resultadoJogada";
import { ResultadoJogo } from "../models/resultadoJogo";

export default {
  emits: ['alterarVencedor', 'alterarJogador', 'reset'],
  data() {
    return {
      jogo: new Jogo(),
      statistics: {}
    }
  },
  methods: {
    generateUID() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < 4; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      return result;
    },
    getStatistics() {
      fetch('http://localhost:3000/statistics/1')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong');
          }
        })
        .then(data => {
          this.statistics = data;
        })
        .catch(error => console.log(error));
    },
    updateSimulation() {
      /* Efetue o pedido para atualizar a simulação
         no json-server */
      let count = 0;
      for (const subArr of this.jogo.tabuleiro) {
        count += subArr.length;
      }

      let vencedor = this.jogo.vencedor === ResultadoJogo.AMARELO ? false : true;
      let primeiro = count % 2 === 0 ? !vencedor : vencedor;

      fetch('http://localhost:3000/simulation/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.jogo.id,
          startPlayer: primeiro,
          plays: this.jogo.plays
        })
      });

    },
    updateStatistics() {
      /* Efetue o pedido para atualizar as estatísticas
         no json-server -- método PATCH*/
      fetch('http://localhost:3000/statistics/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.statistics)
      });
    },
    saveGame() {
      /* Efetue o pedido para guardar o resultado
         do jogo no json-server */
      fetch('http://localhost:3000/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.generateUID(),
          date: new Date().toISOString(),
          game: {
            tabuleiro: this.jogo.tabuleiro,
            jogadorAJogar: this.jogo.jogadorAJogar,
            vencedor: this.jogo.vencedor,
            terminado: this.jogo.terminado
          }
        })
      })
    },
    jogar(coluna) {
      const res = this.jogo.jogar(coluna);

      if (res === ResultadoJogada.ERRO_COLUNACHEIA) {
        alert('A coluna já está cheia!');
      } else if (res === ResultadoJogada.ERRO_JOGOTERMINADO) {
        alert('O jogo já terminou. Faça um novo jogo.')
      } else if (res === ResultadoJogada.TERMINOU) {
        if (this.jogo.vencedor === ResultadoJogo.AMARELO) {
          this.statistics.yellow++;
        } else if (this.jogo.vencedor === ResultadoJogo.VERMELHO) {
          this.statistics.red++;
        } else {
          this.statistics.draw++;
        }
        this.updateSimulation();
        this.updateStatistics();
        this.saveGame();
        this.$emit('alterarVencedor', this.jogo.vencedor);
      } else {
        this.$emit('alterarJogador', this.jogadorAJogar)
      }
    },
    reset() {
      this.jogo.reset();
      this.$emit('reset', this.jogo.vencedor);
    }
  },
  computed: {
    statusJogo() {
      const vencedor = this.jogo.vencedor;

      if (vencedor === ResultadoJogo.AMARELO) {
        return 'Vencedor: Amarelo';
      }

      if (vencedor === ResultadoJogo.VERMELHO) {
        return 'Vencedor: Vermelho';
      }

      if (vencedor === ResultadoJogo.EMPATE) {
        return 'Empate'
      }

      return this.jogo.jogadorAJogar
        ? 'Jogador: Vermelho'
        : 'Jogador: Amarelo'
    }
  },
  created() {
    this.getStatistics();
  }
}
</script>

<template>
  <div class="status">{{ statusJogo }}</div>
  <Tabuleiro :jogo="jogo" @jogar="jogar" />
  <div class="button-container">
    <Button @click="reset">Novo Jogo</Button>
  </div>
</template>

<style scoped>
.status {
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