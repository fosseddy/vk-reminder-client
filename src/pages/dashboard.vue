<script>
import * as vk from "@/vk";

export default {
	computed: {
		user() {
			return this.$store.state.auth.user;
		}
	},

	methods: {
		async logout() {
			await vk.logout();
			localStorage.removeItem("userid");
			this.$router.push("/");
		}
	}
};
</script>

<template>
<div>
	<h1>This is Dashboard Page</h1>

	<img :src="user.avatar" />
	<p>{{ user.firstname }} {{ user.lastname }}</p>

	<button @click="logout">Logout</button>
</div>
</template>

<style scoped>
</style>
