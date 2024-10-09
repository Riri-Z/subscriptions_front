<template>
  <div
    class="flex h-16 w-16 flex-col justify-end rounded-xl p-2 text-center"
    :class="{
      'bg-slate-600': day !== null,
      'bg-slate-800': day === null,
    }"
  >
    <p>{{ day }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  day: number | null;
}>();
</script>

<style></style>
