<!--script>
import * as http from "@/http";
import * as storage from "@/storage";

export default {
  async created() {
    const { session } = await VK.Auth.getLoginStatusAsync();
    const id = storage.getUserId();

    if (!session || !id) return;

    const { response } = await VK.Api.getUserInfo(id);
    const user = response[0];

    // @NOTE(art): technically this will never happen
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
};
</script-->

<script>
import Calendar from "@/components/calendar.vue";

export default {
  components: { Calendar }
}
</script>

<template>
<Calendar />
<!--router-view></router-view-->
</template>
