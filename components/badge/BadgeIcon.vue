<template>
  <span class="m-auto p-1 text-center">
    <img
      v-if="props.icon_url"
      :src="props.icon_url"
      width="24"
      height="24"
      :alt="props.name"
    />
  </span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: string;
  icon_url: string;
}>();
</script>
