<script>
import * as http from "@/http";
import * as storage from "@/storage";

export default {
    data() {
        return {
            loading: true,
            error: null
        };
    },

    async created() {
        try {
            const { session } = await VK.Auth.getLoginStatusAsync();
            const id = storage.getUserId();
            if (!session || !id) return;

            const { response } = await VK.Api.getUserInfo(id);
            const user = response[0];
            if (!user) return;

            delete session.user;
            storage.setSessionHeader({
                ...session,
                userId: user.id
            });

            this.$store.commit("auth/setUser", {
                id: user.id,
                firstname: user.first_name,
                lastname: user.last_name,
                avatar: user.photo_100
            });

            const res = await http.messages.allowed();
            if (res.error) {
                console.error(res.error);
                this.error = res.error.message;
                return;
            }

            const r = res.data.allowed ? "/dashboard" : "/allow-messages";
            await this.$router.push(r);
        } catch(err) {
            console.error(err);
            this.error = "Something went wrong. Please try again later";
        } finally {
            this.loading = false;
        }
    }
};
</script>

<template>
    <h1 v-if="loading">App is loading...</h1>
    <div v-else-if="error">
        <h1>There was an error</h1>
        <p>{{ error }}</p>
    </div>
    <router-view v-else></router-view>
</template>
