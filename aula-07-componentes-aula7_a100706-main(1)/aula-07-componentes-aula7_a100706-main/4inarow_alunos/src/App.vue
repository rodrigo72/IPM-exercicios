<!-- Este documento apresenta uma solução em construção. É fornecido como 
     material de estudo. Recomenda-se que o revejam e melhorem conforme   
     forem adquirindo novos conhecimentos. -->

<script>
import OJogo from './components/OJogo.vue';
import NavBar from './components/NavBar.vue';
import { ResultadoJogo } from './models/resultadoJogo';

export default {
    components: {
        OJogo,      // equivalente a: 'OJogo': OJogo, permite também usar <o-jogo>
        NavBar      // equivalente a: 'NavBar': NavBar, permite também usar <nav-bar>
    },
    data() {
        return {
            status: ""
        }
    },
    methods: {
        updatePlayer(player) {
            console.log("Player: " + player);
            if (player === true) {
                this.status = "Vermelho";
            } else {
                this.status = "Amarelo";
            }
        },
        updateStatus(vencedor) {
            console.log("Vencedor: " + vencedor);
            if (vencedor === ResultadoJogo.EMPATE) {
                this.status = "Empate";
            } else {
                let v = "";
                if (vencedor === ResultadoJogo.AMARELO) v = "Amarelo";
                else v = "Vermelho";
                this.status = "Vencedor - " + v;
            }
        }
    }
}
</script>

<template>
    <NavBar :status="status" />
    <OJogo @jogadorAlterado="updatePlayer" @jogoTerminou="updateStatus" @reset="updatePlayer"/>
</template>
