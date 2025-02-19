<template>
  <button
    class="flex w-full items-center gap-2 text-black transition-transform duration-300 ease-in-out md:p-4 md:hover:scale-110"
  >
    <img
      :key="icon.id"
      class="h-[25px] w-[25px] md:h-[16px] md:w-[16px]"
      :src="icon.path"
      :alt="icon.name"
    />

    <p class="hidden tracking-wider text-light md:flex">
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
