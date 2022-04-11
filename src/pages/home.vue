<script>
async function vkLogin() {
	return new Promise(resolve => VK.Auth.login(resolve));
}

async function getUserInfo(id) {
	return new Promise(resolve =>
		VK.Api.call(
			"users.get",
			{ user_ids: id, fields: "photo_100", v: "5.131" },
			resolve
		)
	);
}

export default {
	data() {
		return {};
	},

	computed: {},

	methods: {
		async login() {
			const res = await vkLogin().catch(console.error);

			if (res.session) {
				const { id } = res.session.user;
				const { response } =
					await getUserInfo(id).catch(console.error);
				const user = response[0];

				if (user) {
					this.$store.commit("auth/setUser", {
						id: user.id,
						firstname: user.first_name,
						lastname: user.last_name,
						avatar: user.photo_100
					});
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
