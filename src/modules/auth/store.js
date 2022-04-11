const auth = {
	namespaced: true,

	state() {
		return {
			user: null
		};
	},

	mutations: {
		setUser(state, user) {
			state.user = user;
		}
	}

};

export { auth };
