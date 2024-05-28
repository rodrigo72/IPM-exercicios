<script>
import { Jogo } from "../models/jogo.js";

export default {
  props: ['id'],
  data() {
    return {
      game: new Jogo()
    };
  },
  methods: {
    getGame() {
      /* Codifique o método para obter o jogo salvaguardado a 
        partir do id recebido nas props */
      fetch(`http://localhost:3000/games/${this.id}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Erro ao obter o jogo');
          }
        })
        .then(data => {
          this.game = new Jogo();
          this.game.jogadorAJogar = data.game.jogadorAJogar;
          this.game.tabuleiro = data.game.tabuleiro;
          this.terminado = data.game.terminado;
          this.vencedor = data.game.vencedor;
        })
        .catch(error => console.log(error));
    }
  },
  created() {
    this.getGame();
  }
}
</script>

<template>
  <Tabuleiro :jogo="game" />
</template>