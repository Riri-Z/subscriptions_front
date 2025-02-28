<template>
  <img
    v-if="props.iconUrl"
    width="10"
    height="10"
    :src="props.iconUrl"
    :alt="props.name"
  />
  <p v-else class="m-auto">
    {{ props.name }}
  </p>
</template>

<script lang="ts" setup>
const props = defineProps({
  name: { type: String, default: "" },
  iconUrl: { type: String, default: null },
});
</script>
