<script>
export default {
  emits: ["allow", "deny"],

  data() {
    return {
      // @NOTE(art): generates unique hash
      id: "vk-messages_" + Math.random().toString(36).slice(2)
    };
  },

  methods: {
    onAllow(userId) {
      this.$emit("allow", userId);
    },

    onDeny(userId) {
      this.$emit("deny", userId);
    }
  },

  created() {
    VK.Observer.subscribe(
      "widgets.allowMessagesFromCommunity.allowed",
      this.onAllow
    );

    VK.Observer.subscribe(
      "widgets.allowMessagesFromCommunity.denied",
      this.onDeny
    );
  },

  mounted() {
    VK.Widgets.AllowMessagesFromCommunity(
      this.id,
      { height: 30 },
      // @TODO(art): get community id from server?
      202435034
    );
  },

  unmounted() {
    VK.Observer.unsubscribe(
      "widgets.allowMessagesFromCommunity.allowed",
      this.onAllow
    );

    VK.Observer.unsubscribe(
      "widgets.allowMessagesFromCommunity.denied",
      this.onDeny
    );
  }
};
</script>

<template>
<div :id="id"></div>
</template>
