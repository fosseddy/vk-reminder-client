<script>
export default {
  created() {
    VK.Observer.subscribe("widgets.allowMessagesFromCommunity.allowed", () =>
        this.$router.push("/dashboard")
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
    VK.Observer.unsubscribe("widgets.allowMessagesFromCommunity.allowed");
  }
};
</script>

<template>
<div>
  <h1>This is Allow Messages Page</h1>
  <div id="vk_send_message"></div>
</div>
</template>
