import { createStore } from "vuex";
import { auth } from "@/modules/auth/store.js";

const store = createStore({
	modules: { auth }
});

export { store };
