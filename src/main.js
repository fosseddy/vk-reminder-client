import { createApp } from "vue";
import { store } from "@/store";
import { router } from "@/router";
import * as vk from "@/vk";
import App from "@/app.vue";

vk.init();

createApp(App)
	.use(store)
	.use(router)
	.mount("#app");
