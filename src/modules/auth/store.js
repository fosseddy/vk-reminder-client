import * as vk from "@/vk";

const auth = {
	namespaced: true,

	state() {
		return {
			user: null
		};
	},

	getters: {
		user(state) {
			return state.user || {};
		}
	},

	mutations: {
		setUser(state, user) {
			state.user = user;
		}
	}
};

export { auth };
