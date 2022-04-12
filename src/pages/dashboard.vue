<script>
export default {
	computed: {
		user() {
			return this.$store.getters["auth/user"];
		}
	},

	methods: {
		async logout() {
			await VK.Auth.logoutAsync();
			localStorage.removeItem("userid");
			this.$store.commit("auth/setUser", null);
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
