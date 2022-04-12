import { createStore } from "vuex";
import { auth } from "@/modules/auth/store.js";

const store = createStore({
	modules: { auth },
	strict: process.env.NODE_ENV !== "production"
});

export { store };
