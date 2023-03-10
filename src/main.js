import { createApp } from "vue";
import { store } from "@/store";
import { router } from "@/router";

import "@/style.css";

import "@/vk";

import App from "@/app.vue";

createApp(App)
    .use(store)
    .use(router)
    .mount("#app");
