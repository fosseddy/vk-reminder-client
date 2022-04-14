<script>
import VKAllowMessages from "@/components/vk-allow-messages.vue";

export default {
  components: { VKAllowMessages },

  methods: {
    onAllow() {
      this.$router.push("/dashboard");
    }
  }
}
</script>

<template>
<div>
  <h1>This is Allow Messages Page</h1>
  <VKAllowMessages @allow="onAllow" />
</div>
</template>
