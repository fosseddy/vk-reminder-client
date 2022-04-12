<script>
// @TODO(art): replace fake implementation with real one
async function areMessagesAllowed(userId = -1, res = -1) {
	const delay = 250;

	return new Promise((resolve, reject) => {
		if (userId === -1) {
			return setTimeout(() => {
				reject(new Error("areMessagesAllowed Error"));
			}, delay);
		}

		return setTimeout(() => {
			if (res === -1) {
				resolve(Math.floor(Math.random() * 5) > 0);
			} else {
				resolve(res);
			}
		}, delay);
	});
}

export default {
	data() {
		return { error: null };
	},

	methods: {
		// @TODO(art): delete this
		async logout() {
			const res = await VK.Auth.logoutAsync();
			localStorage.removeItem("userid");
			this.$store.commit("auth/setUser", null);
			this.$router.push("/");
		},

		async login() {
			this.error = null;

			const { session } = await VK.Auth.loginAsync();

			if (session) {
				const { id } = session.user;
				const { response } = await VK.Api.getUserInfo(id);
				const user = response[0];

				if (user) {
					const allowed =
						await areMessagesAllowed(user.id, false).catch(err =>
							this.error = err
						);

					if (this.error != null) {
						// @TODO(art): handle error
						return console.error(this.error);
					}

					if (allowed) {
						this.$router.push("/dashboard");
					} else {
						this.$router.push("/allow-messages");
					}

					this.$store.commit("auth/setUser", {
						id: user.id,
						firstname: user.first_name,
						lastname: user.last_name,
						avatar: user.photo_100
					});

					localStorage.setItem("userid", id);
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
	<button @click="logout">logout</button>
</div>
</template>
