<template>
  <button
    @click="handleClickDay"
    class="flex h-16 w-16 flex-col rounded-xl p-2"
    :class="{
      'bg-slate-600': day !== null,
      'bg-slate-800': day === null,
    }"
  >
    <p>{{ day }}</p>
  </button>
</template>

<script lang="ts" setup>
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";

const subscriptionStore = useSubscriptionsStore();

// modal logic
const open = ref(false);
const props = defineProps<{
  day: number | null;
  sourceDate: Dayjs | null;
}>();

const computedDate = computed(() => {
  if (!props.sourceDate || !props.day) return null;
  const date = dayjs();
  return date.set("date", props.day).toISOString();
});
function handleClickDay() {
  console.log("computedDate.value", computedDate.value);
  if (computedDate.value) {
    subscriptionStore.setSelectedDate(computedDate.value);
    console.log("Modal Open state before:", subscriptionStore.isModalOpen);

    subscriptionStore.openModal();
  } else {
    console.info("No date available");
  }
}
</script>
