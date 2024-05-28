import { defineStore } from "pinia";

export const useSimulationStore = defineStore('simulation', {
	/* Construa a store relativa à simulação aqui
	 */
	state: () => ({
		startPlayer: null,
		plays: [],
	}),
	actions: {
		async setStartPlayer(jogador) {
			this.startPlayer = jogador;
		},
		async addPlay(coluna) {
			this.plays.push(coluna);
		},
		async reset() {
			this.startPlayer = null;
			this.plays = [];
		},
		async containsSimulation() {
			return this.startPlayer !== null && this.plays.length > 0;
		}
	}
});