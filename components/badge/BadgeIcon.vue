<template>
  <img v-if="props.icon_url" :src="props.icon_url" width="24" height="24" :alt="props.name"/>
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: string;
  icon_url: string;
}>();
</script>
