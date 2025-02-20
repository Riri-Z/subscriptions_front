<template>
  <NuxtImg
    class="cursor-pointer hover:text-purple-300"
    :src="src"
    width="30"
    alt="chevron"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  nameIcon: string;
}>();

const src = computed(() => {
  return `icons/${props.nameIcon}.svg`;
});
</script>
