import { createRouter, createWebHistory } from "vue-router";
import { store } from "@/store";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: () => import("@/pages/home.vue"),
		},
		{
			path: "/about",
			component: () => import("@/pages/about.vue"),
		},
		{
			path: "/dashboard",
			component: () => import("@/pages/dashboard.vue"),
			meta: { private: true }
		},
		{
			path: "/:unknown(.*)*",
			component: () => import("@/pages/not-found.vue"),
		}
	]
});

router.beforeEach((to, from) => {
	if (to.meta.private && !store.state.auth.user) {
		console.assert(to.path !== "/", "infinite redirect to login");
		return "/";
	}

	return true;
});

export { router };
