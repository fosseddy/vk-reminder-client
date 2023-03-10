<script>
import VKAllowMessages from "@/components/vk-allow-messages.vue";

export default {
    components: { VKAllowMessages }
}
</script>

<template>
    <div>
        <h1>This is Allow Messages Page</h1>
        <VKAllowMessages @allow="$router.push('/dashboard')" />
    </div>
</template>
