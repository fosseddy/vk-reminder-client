<script>
import VKAllowMessages from "@/components/vk-allow-messages.vue";

export default {
  components: { VKAllowMessages },

  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  },

  methods: {
    async logout() {
      await VK.Auth.logoutAsync();
      localStorage.removeItem("user-id");
      this.$store.commit("auth/logout");
      this.$router.push("/");
    },

    // @TODO(art): move this to settings page?
    async onDeny() {
      await this.logout();
    }
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

  <!-- @TODO(art): move this to settings page? -->
  <VKAllowMessages @deny="onDeny" />
</div>
</template>

<style scoped>
</style>
