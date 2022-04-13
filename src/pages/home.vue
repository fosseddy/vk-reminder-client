<script>
import * as http from "@/http";

export default {
  methods: {
    // @TODO(art): delete this
    async logout() {
      await VK.Auth.logoutAsync();
      localStorage.removeItem("userid");
      this.$store.commit("auth/setUser", null);
      this.$router.push("/");
    },

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
      if (res.error) {
        // @TODO(art): handle error
        console.error(res.error);
        return;
      }

      console.log(res);

      this.$store.commit("auth/setUser", {
        id: user.id,
        firstname: user.first_name,
        lastname: user.last_name,
        avatar: user.photo_100
      });

      localStorage.setItem("userid", id);

      if (res.data.allowed) {
        this.$router.push("/dashboard");
      } else {
        this.$router.push("/allow-messages");
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
