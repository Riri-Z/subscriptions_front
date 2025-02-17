<template>
  <div class="year-selector m-4 grid grid-cols-4 gap-2 px-2">
    <button
      v-for="year in avalaibleYear"
      class="flex w-24 cursor-pointer items-center justify-center self-center justify-self-center rounded-full text-center text-base hover:scale-105 hover:rounded-full lg:text-xl laptop:text-2xl laptop:hover:scale-125"
      @click="emit('selectYear', year)"
    >
      <p>
        {{ year }}
      </p>
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { Dayjs } from "dayjs";

const props = defineProps<{
  currentDate: Dayjs;
}>();
const emit = defineEmits(["selectYear"]);

const avalaibleYear = computed(() => {
  const currentYear = props.currentDate.get("year");

  const INDEX_CURRENT_YEAR = 6;

  return Array.from({ length: 12 }).map((_, index) => {
    return currentYear - INDEX_CURRENT_YEAR + index;
  });
});
</script>

<style scoped>
.year-selector {
  @apply transition-all duration-200;
}
</style>
