<template>
  <button class="flex w-full items-center gap-2 md:p-4">
    <img
      class="h-[25px] w-[25px] md:h-[16px] md:w-[16px]"
      :key="icon.id"
      :src="icon.path"
      :alt="icon.name"
    />

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
