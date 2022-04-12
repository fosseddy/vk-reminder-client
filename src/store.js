import { createStore } from "vuex";
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

const store = createStore({
	modules: { auth },
	strict: process.env.NODE_ENV !== "production"
});

export { store };
