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
import Select from "@/components/select.vue";

export default {
  components: { Select },

  data() {
    return { h: "00", m: "00" };
  },

  computed: {
    hhx() {
      return [
        "00", "01", "02", "03", "04", "05",
        "06", "07", "08", "09", "10", "11",
        "12", "13", "14", "15", "16", "17",
        "18", "19", "20", "21", "22", "23"
      ];
    },

    mmx() {
      return [
        "00", "05", "10",
        "15", "20", "25",
        "30", "35", "40",
        "45", "50", "55"
      ];
    }
  }
}
</script>

<template>
<Select :value="h" :options="hhx" @value-change="v => h = v" />
<Select :value="m" :options="mmx" @value-change="v => m = v" />
<div>
  <h1>hello, world</h1>
</div>
<!--router-view></router-view-->
</template>

<style scoped>
</style>
