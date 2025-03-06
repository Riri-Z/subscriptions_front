<template>
  <p>{{ text }}</p>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
  },
});
console.log("name", name);
</script>

<style></style>
