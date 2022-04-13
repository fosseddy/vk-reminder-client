import { createStore } from "vuex";

const auth = {
  namespaced: true,

  state() {
    return {
      user: null,
      session: null
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
    },

    setSession(state, session) {
      state.session = session;
    },

    login(state, payload) {
      state.user = payload.user;
      state.session = payload.session;
    },

    logout(state) {
      state.user = null;
      state.session = null;
    }
  }
};

const store = createStore({
  modules: { auth },
  strict: process.env.NODE_ENV !== "production"
});

export { store };
