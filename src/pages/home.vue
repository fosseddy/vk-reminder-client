<script>
import * as http from "@/http";

export default {
  methods: {
    async login() {
      const { session } = await VK.Auth.loginAsync();

      if (!session) return;

      const { id } = session.user;
      const { response } = await VK.Api.getUserInfo(id);
      const user = response[0];

      // @NOTE(art): technically this will never happen
      if (!user) return;

      delete session.user;
      const res = await http.areMessagesAllowed(session, user.id);

      // @TODO(art): handle error
      if (res.error) {
        console.error(res.error);
        return;
      }

      const payload = {
        session,
        user: {
          id: user.id,
          firstname: user.first_name,
          lastname: user.last_name,
          avatar: user.photo_100
        }
      };

      this.$store.commit("auth/login", payload);
      localStorage.setItem("user-id", id);

      this.$router.push(res.data.allowed ? "/dashboard" : "/allow-messages");
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
