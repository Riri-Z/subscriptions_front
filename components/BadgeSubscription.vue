<script lang="ts" setup>
const props = defineProps<{
  name: string;
}>();
</script>

<template>
  <!-- TODO : COMPONENT DISPLAY ICON CURRENT SUBSCRIPTION -->
  <!-- TODO : Better display on mobile-->
  <span
    class="flex h-5 w-5 flex-row justify-center rounded-full bg-blue-800 align-middle text-xs"
  >
    {{ props.name?.[0].toLowerCase() }}
  </span>
</template>
