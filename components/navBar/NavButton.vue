<template>
  <button class="flex w-full gap-2 self-center md:p-10">
    <NuxtImg :key="icon.id" :src="icon.path" width="24" height="24"> </NuxtImg>
    <p  class="hidden md:flex self-center text-xs">
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
