<script>
export default {
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  },

  methods: {
    async logout() {
      await VK.Auth.logoutAsync();
      localStorage.removeItem("userid");
      this.$store.commit("auth/logout");
      this.$router.push("/");
    }
  },

  created() {
    VK.Observer.subscribe(
      "widgets.allowMessagesFromCommunity.denied",
      async () => await this.logout()
    );
  },

  mounted() {
    VK.Widgets.AllowMessagesFromCommunity(
      "vk_send_message",
      { height: 30 },
      // @TODO(art): get community id from server?
      202435034
    );
  },

  unmounted() {
    VK.Observer.unsubscribe("widgets.allowMessagesFromCommunity.denied");
  }
};
</script>

<template>
<div>
  <h1>This is Dashboard Page</h1>

  <img :src="user.avatar" />
  <p>{{ user.firstname }} {{ user.lastname }}</p>

  <button @click="logout">Logout</button>
  <br /><br />
  <div id="vk_send_message"></div>
</div>
</template>

<style scoped>
</style>
