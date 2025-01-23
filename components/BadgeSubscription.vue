<script lang="ts" setup>
const props = defineProps<{
  name: string;
  index: number;
}>();

// Compute translate value based on window size
const translateValue = computed(() => {
  const size = window.innerWidth;

  return `translateX(${getTranslationFactor(size) * props.index}px)`;
});

const getTranslationFactor = (size: number) => {
  if (size > 1024) return 20;
  if (size > 1000) return 18;
  if (size > 768) return 13;
  if (size > 480) return 15;
  return 10;
};

const randomColor = ref(
  letterColorMap[props.name?.toLowerCase()[0]]
    ? letterColorMap[props.name?.toLowerCase()[0]]
    : "#96a240",
);
</script>

<template>
  <!-- TODO : FIX display on mobile
       - when window size is less than 480, display two icons and add '..'  to tell users there is more
  -->
  <span
    class="absolute flex h-4 w-4 transform flex-row justify-center rounded-full align-middle text-xs lg:h-5 lg:w-5"
    :style="{
      zIndex: props.index,
      transform: translateValue,
      backgroundColor: randomColor,
    }"
  >
    <p class="m-auto text-center">
      {{ props.name?.[0].toUpperCase() }}
    </p>
  </span>
</template>
