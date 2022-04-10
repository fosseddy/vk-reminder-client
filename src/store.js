import { createStore } from "vuex";

const count = {
	namespaced: true,

	state() {
		return {
			value: 0
		};
	},

	mutations: {
		inc(state) {
			state.value += 1;
		},

		dec(state) {
			state.value -= 1;
		}
	}
};

const store = createStore({
	modules: { count }
});

export { store };
