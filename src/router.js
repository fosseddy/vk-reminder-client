import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/home.vue";
import About from "@/pages/about.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", component: Home },
		{ path: "/about", component: About }
	]
});

export { router };
