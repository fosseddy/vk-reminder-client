<script>
import VKAllowMessages from "@/components/vk-allow-messages.vue";
import * as http from "@/http";
import * as storage from "@/storage";

export default {
  components: { VKAllowMessages },

  data() {
    return {
      reminders: []
    };
  },

  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  },

  methods: {
    async logout() {
      await VK.Auth.logoutAsync();
      storage.UserId.remove();
      storage.SessionHeader.remove();
      this.$store.commit("auth/setUser", null);
      this.$router.push("/");
    },

    // @TODO(art): move this to settings page?
    async onDeny() {
      await this.logout();
    }
  },

  async created() {
    let err = null;
    const res = await http.getReminders().catch(e => err = e);

    // @TODO(art): handle error
    if (err) {
      return console.error(err);
    }

    // @TODO(art): handle error
    if (res.error) {
      return console.error(res.error);
    }

    this.reminders = res.data.items;
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

  <h2>Reminders</h2>

  <form>
    <input type="text" />
    <input type="date" />
    <button type="submit">Add</button>
  </form>

  <ul>
    <li v-for="r in reminders">{{ r.text }}</li>
  </ul>
</div>
</template>

<style scoped>
</style>
