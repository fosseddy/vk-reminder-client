<script>
async function vkLogout() {
	return new Promise(resolve => VK.Auth.logout(res => resolve(res)));
}

export default {
	data() {
		return {};
	},

	computed: {
		user() {
			return this.$store.state.auth.user;
		}
	},

	methods: {
		async logout() {
			await vkLogout();
			localStorage.removeItem("userid");
			this.$router.push("/");
		}
	},
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
