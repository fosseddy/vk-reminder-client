<script>
</script>

<template>
<div>
    <h1>hello, world</h1>
    <p>{{ $store.state.count }}</p>
    <button @click="$store.commit('inc', 1)">inc</button>
    <button @click="$store.commit('inc', -1)">dec</button>
</div>
</template>
