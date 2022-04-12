import { createRouter, createWebHistory } from "vue-router";
import { store } from "@/store";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: () => import("@/pages/home.vue"),
			meta: { private: false }
		},
		{
			path: "/about",
			component: () => import("@/pages/about.vue"),
			meta: { private: false }
		},
		{
			path: "/dashboard",
			component: () => import("@/pages/dashboard.vue"),
			meta: { private: true }
		},
		{
			path: "/:unknown(.*)*",
			component: () => import("@/pages/not-found.vue"),
			meta: { private: false }
		}
	]
});

router.beforeEach((to, from) => {
	console.log(to.path, store.state.auth.user);

	if (to.meta.private) {
		console.assert(to.path !== "/", "infinite redirect to login");
		if (!store.state.auth.user) return "/";
	}

	if (to.path == "/" && store.state.auth.user) return "/dashboard";

	return true;
});

export { router };
