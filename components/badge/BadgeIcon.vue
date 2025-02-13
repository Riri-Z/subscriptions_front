<template>
  <img
    v-if="props.iconUrl"
    class="max-h-[12px]"
    width="10"
    height="10"
    :src="props.iconUrl"
    :alt="props.name"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: string;
  iconUrl: string;
}>();
</script>
