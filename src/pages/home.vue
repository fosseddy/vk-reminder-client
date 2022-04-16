<script>
import * as http from "@/http";
import * as storage from "@/storage";

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
      storage.UserId.set(user.id);
      storage.SessionHeader.set({
        ...session,
        userId: user.id
      });

      this.$store.commit("auth/setUser", {
        id: user.id,
        firstname: user.first_name,
        lastname: user.last_name,
        avatar: user.photo_100
      });

      let err = null;
      const res = await http.areMessagesAllowed().catch(e => err = e);

      // @TODO(art): handle error
      if (err) {
        return console.error(err);
      }

      // @TODO(art): handle error
      if (res.error) {
        return console.error(res.error);
      }

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
