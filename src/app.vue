<script>
import * as vk from "@/vk";

export default {
	data() {
		return { loading: false };
	},

	async created() {
		this.loading = true;

		const { session } = await vk.getLoginStatus();
		const id = localStorage.getItem("userid");

		if (session && id) {
			const { response } = await vk.getUserInfo(id);
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

		this.loading = false;
	}
};
</script>

<template>
<h1 v-if="loading">Loading...</h1>
<router-view v-else></router-view>
</template>
