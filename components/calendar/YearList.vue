<template>
  <div class="year-selector m-4 grid grid-cols-4 gap-2 px-2">
    <button
      v-for="year in computeAvailableYear"
      :key="year"
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
import { YEAR_ACTION } from "~/types/yearAction/yearAction.ts";
import type { Dayjs } from "dayjs";

const INDEX_CURRENT_YEAR = 6;
const NUMBER_AVALAIBLE_YEARS = 12;

const props = defineProps<{
  currentDate: Dayjs;
}>();

const emit = defineEmits(["selectYear"]);

const computeAvailableYear = ref<number[] | null>();

onMounted(() => {
  computeListYears(props.currentDate.get("year"));
});

/**
 * Compute year options when user has to select a new one
 * By default the current one is at middle and the user has 12 choices
 **/
function computeListYears(currentYear: number) {
  computeAvailableYear.value = Array.from({
    length: NUMBER_AVALAIBLE_YEARS,
  }).map((_, index) => {
    return currentYear - INDEX_CURRENT_YEAR + index;
  });
}

function handleComputeNewYearsChoices(action: YEAR_ACTION) {
  let newYear =
    computeAvailableYear.value.at(INDEX_CURRENT_YEAR) + INDEX_CURRENT_YEAR;
  console.log();
  if (action === YEAR_ACTION.PREVIOUS) {
    newYear =
      computeAvailableYear.value.at(INDEX_CURRENT_YEAR) - INDEX_CURRENT_YEAR;
  }

  return computeListYears(newYear);
}

function StartAndEndYearsChoices() {
  if (
    computeAvailableYear?.value?.[0] &&
    computeAvailableYear?.value?.slice(-1)
  ) {
    return {
      start: computeAvailableYear.value[0],
      end: computeAvailableYear.value.slice(-1),
    };
  }
}
defineExpose({
  handleComputeNewYearsChoices,
  StartAndEndYearsChoices,
});
</script>

<style lang="postcss" scoped>
.year-selector {
  @apply transition-all duration-200;
}
</style>
