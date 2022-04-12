<script>
import * as vk from "@/vk";

export default {
	methods: {
		async login() {
			const { session } = await vk.login();

			if (session) {
				const { id } = session.user;
				const { response } = await vk.getUserInfo(id);
				const user = response[0];

				if (user) {
					this.$store.commit("auth/setUser", {
						id: user.id,
						firstname: user.first_name,
						lastname: user.last_name,
						avatar: user.photo_100
					});

					localStorage.setItem("userid", id);

					this.$router.push("/dashboard");
				}
			}
		}
	}
};
</script>

<template>
<div>
	<h1>Welcome to VK Reminder</h1>
	<p>WebApp to create reminders, which will be sent to you in VK.</p>

	<button @click="login">Login</button>
</div>
</template>

<style scoped>
</style>
