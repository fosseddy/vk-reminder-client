<script>
import * as http from "@/http";

export default {
  async created() {
    const { session } = await VK.Auth.getLoginStatusAsync();
    const id = localStorage.getItem("user-id");

    if (!session || !id) return;

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
    this.$router.push(res.data.allowed ? "/dashboard" : "/allow-messages");
  }
};
</script>

<template>
<router-view></router-view>
</template>
