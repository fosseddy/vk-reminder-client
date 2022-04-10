<script>
export default {
	data() {
		return {
		};
	},

	computed: {
	},

	methods: {
		login() {
			VK.Auth.login(session => {
				console.log(session);
			});
		},

		logout() {
			VK.Auth.logout(res => {
			VK.Auth.logout
				console.log(res);
			});
		}
	},
};
</script>

<template>
<div>
	<h1>Welcome to VK Reminder</h1>
	<p>WebApp to create reminders, which will be sent to you in VK.</p>

	<button @click="login">Login</button>
	<button @click="logout">Logout</button>

	<!-- <router-link to="/login">Login</router-link> -->
</div>
</template>

<style scoped>
</style>
