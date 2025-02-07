<template>
  <span class="m-auto p-1 text-center">
    <img
      v-if="props.iconUrl"
      :src="props.iconUrl"
      width="24"
      height="24"
      :alt="props.name"
    >
  </span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: string;
  iconUrl: string;
}>();
</script>
