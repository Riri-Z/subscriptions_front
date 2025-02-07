<template>
  <button class="flex w-full items-center gap-2 md:p-4">
    <NuxtImg :key="icon.id" :src="icon.path" width="16" height="16" />
    <p class="hidden tracking-wider md:flex">
      {{
        icon.name.slice(0, 1).toUpperCase() +
        icon.name.slice(1, icon.name.length)
      }}
    </p>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  icon: { name: string; path: string; route: string; id: number };
}>();
</script>
