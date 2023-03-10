import { createStore } from "vuex";

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

export const store = createStore({
    modules: { auth },
    strict: process.env.NODE_ENV !== "production"
});
