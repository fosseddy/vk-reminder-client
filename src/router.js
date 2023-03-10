import { createRouter, createWebHistory } from "vue-router";
import { store } from "@/store";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: () => import("@/pages/home.vue")
        },
        {
            path: "/allow-messages",
            component: () => import("@/pages/allow-messages.vue"),
            meta: { private: true }
        },
        {
            path: "/dashboard",
            component: () => import("@/pages/dashboard.vue"),
            meta: { private: true }
        },
        {
            path: "/:unknown(.*)*",
            component: () => import("@/pages/not-found.vue")
        }
    ]
});

router.beforeEach((to, from) => {
    if (to.meta.private && !store.state.auth.user) {
        if (to.path === "/") throw new Error("infinite redirect to login");
        return "/";
    }

    return true;
});
