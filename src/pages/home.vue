<script>
import * as http from "@/http";
import * as storage from "@/storage";

export default {
    data() {
        return {
            loading: false,
            error: null
        };
    },

    methods: {
        async login() {
            try {
                this.loading = true;

                const { session } = await VK.Auth.loginAsync();
                if (!session) return;

                const { id } = session.user;
                const { response } = await VK.Api.getUserInfo(id);
                const user = response[0];
                if (!user) return;

                delete session.user;
                storage.setUserId(user.id);
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
    }
};
</script>

<template>
    <div v-if="error">
        <h1>There was an error</h1>
        <p>{{ error }}</p>
    </div>

    <div v-else>
        <h1>Welcome to VK Reminder</h1>
        <p>WebApp to create reminders, which will be sent to you in VK.</p>

        <button v-if="loading" disabled>Loading...</button>
        <button v-else @click="login">Login</button>
    </div>
</template>
