<script>
    export default {
        name: 'NavBar',
        props: { // props are used to pass data from a parent component (in this case, App.vue) down to a child component (NavBar.vue).
            status: {
                type: String,
                required: true
            }
        },
        methods: {
            updatePlayerClass() {
                if (this.status === "Vermelho") {
                    return "red";
                } else if (this.status === "Amarelo") {
                    return "yellow";
                } else {
                    return "finished";
                }
            }
        }
    }
</script>


<template>
    <div class="navbar-container">
        <div id="title">4 em Linha</div>
        <div id="player" :class="updatePlayerClass()">{{status}}</div>
    </div>
</template>


<style scoped>
    .navbar-container {
        padding-right: 30px;
        padding-left: 30px;
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: #f5f5f5;
        position: fixed;
        top: 10px;
        right: 10px;
        left: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 3px;
    }

    #title {
        font-size: 27px;
        font-weight: bold;
        font-family: 'Arial';
    }

    #player {
        font-size: 20px;
        font-weight: bold;
        font-family: 'Arial';
        border: solid 1px #000;
        border-radius: 5px;
        padding: 13px;
    }

    .yellow {
        background-color: #ffff54;
    }

    .red {
        background-color: #ea3322;
    }

    .finished {
        background-color: #f5f5f5;
        color: #b2b2b2;
    }
</style>