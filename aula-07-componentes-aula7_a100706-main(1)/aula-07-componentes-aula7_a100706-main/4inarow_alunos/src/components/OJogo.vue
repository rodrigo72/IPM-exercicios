<script>
    import { ResultadoJogada } from "@/models/resultadoJogada";
    import { Jogo } from "../models/jogo";

    export default {
        emits: ['jogadorAlterado', 'jogoTerminou', 'reset'],
        data() {
            let j = new Jogo();
            this.$emit("jogadorAlterado", j.jogadorAJogar);
            return {
                jogo: j,
                n_col: Jogo.NUMERO_COLUNAS,
                n_lin: Jogo.NUMERO_LINHAS
            }
        },
        computed: {
            reversedRowIndices() {
                return Array.from({ length: this.n_lin }, (_, i) => this.n_lin - i);
            }
        },
        methods: {
            getCellClass(c, l) {
                try {
                    let r = this.jogo.tabuleiro[c - 1][l - 1];
                    if (r === false) return "yellow";
                    if (r === true) return "red";
                    return "";
                } catch (e) {
                    return "";
                }
            },
            jogar(coluna) {
                let r = this.jogo.jogar(coluna-1);

                if (r === ResultadoJogada.ERRO_COLUNAINVALIDA) {
                    alert("Coluna inválida!");
                } else if (r === ResultadoJogada.ERRO_COLUNACHEIA) {
                    alert("Coluna cheia!");
                } else if (r === ResultadoJogada.ERRO_JOGOACABOU) {
                    alert("Jogo já terminou!");
                } else if (r === ResultadoJogada.SUCESSO) {
                    this.$emit("jogadorAlterado", this.jogo.jogadorAJogar)
                } else if (r === ResultadoJogada.TERMINOU) {
                    this.$emit("jogoTerminou", this.jogo.vencedor)
                }
            },
            reset() {
                this.jogo.reset();
                this.$emit("reset", this.jogo.jogadorAJogar)
                return this.jogo.jogadorAJogar;
            }
        }
    }
</script>


<template>
    <div class="tabuleiro">
        <div v-for="c in n_col" @click="jogar(c)" class="coluna">
            <div v-for="l in reversedRowIndices" class="celula">
                <div class="celula_interior" :class="getCellClass(c, l)">
                </div>
            </div>
        </div>
    </div>
    <div style="text-align: center;">
        <button @click="reset">Reset</button>
    </div>
</template>


<style scoped>
    .tabuleiro {
        margin-top: 5% !important;
        display: flex;
        width: 45%;
        margin: auto;
    }

    .coluna {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .celula {
        background-color: blue;
        aspect-ratio: 1;
    }

    .celula_interior {
        border-radius: 100%;
        background-color: white;
        height: 100%;
    }

    .yellow {
        background-color: yellow;
    }

    .red {
        background-color: red;
    }

    button {
        margin-top: 10px;
        border: 1px solid black;
        border-radius: 5px;
        text-align: center;
        padding: 10px;
        font-weight: 600;
    }
</style>