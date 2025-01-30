<template>
  <button
    class="flex w-full gap-2 self-center p-12 md:p-8"
    @click="emit('handleClick', icon.name)"
  >
    <NuxtImg :key="icon.id" :src="icon.path" width="24" height="24"> </NuxtImg>
    <p class="flex self-center">
      {{
        icon.name.slice(0, 1).toUpperCase() +
        icon.name.slice(1, icon.name.length)
      }}
    </p>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  icon: { name: string; path: string; id: number };
}>();

const emit = defineEmits<{
  handleClick: [value: string];
}>();
</script>
