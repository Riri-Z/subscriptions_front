<template>
  <div class="year-selector m-4 grid grid-cols-4 gap-2 px-2">
    <button
      v-for="year in computeAvailableYear"
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

/**
 * Compute year options when user has to select a new one
 * By default the current one is at middle and the user has 12 choices
 **/
const computeAvailableYear = ref<number[] | null>();

onMounted(() => {
  computeListYears(props.currentDate.get("year"));
});

function computeListYears(currentYear: number) {
  const INDEX_CURRENT_YEAR = 6;
  computeAvailableYear.value = Array.from({ length: 12 }).map((_, index) => {
    return currentYear - INDEX_CURRENT_YEAR + index;
  });
}

function handleComputeNewYearsChoices(action: string) {
  //TODO : add guard
  let newYear = computeAvailableYear.value.at(6) + 6;
  if (action === "minus") {
    newYear = computeAvailableYear.value.at(6) - 6;
  }

  return computeListYears(newYear);
}
function StartAndEndYearsChoices() {
  if (
    computeAvailableYear?.value?.[0] &&
    computeAvailableYear?.value?.slice(-1)
  ) {
    return [
      computeAvailableYear.value[0],
      computeAvailableYear?.value?.slice(-1),
    ];
  }
}
defineExpose({
  handleComputeNewYearsChoices,
  StartAndEndYearsChoices,
});
</script>

<style scoped>
.year-selector {
  @apply transition-all duration-200;
}
</style>
