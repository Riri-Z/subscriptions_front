<template>
  <button
    class="fex-col flex h-10 rounded-xl p-2 lg:h-16"
    :class="{
      'bg-slate-500': day !== null && !selectedDay,
      'bg-slate-800': day === null,
      'bg-green-800': selectedDay,
    }"
    @click="handleClickDay"
  >
    <p class="text-xs lg:text-base">{{ day }}</p>
    <!-- TODO : COMPONENT DISPLAY ICON CURRENT SUBSCRIPTION -->
    <section class="flex flex-row flex-wrap">
      <span
        v-if="subscriptionActive"
        v-for="subscription in subscriptionActive"
      >
        <p>
          {{ subscription?.subscription?.name?.[0] }}
        </p>
      </span>
    </section>
  </button>
</template>

<script lang="ts" setup>
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import dayjs, { Dayjs } from "dayjs";
import type { Subscription } from "~/types/store/subscriptionsStore";
import { useDate } from "~/composables/useDate";
const subscriptionStore = useSubscriptionsStore();
const { getDayInMonth } = useDate();

const props = defineProps<{
  day: null | number;
  sourceDate: Dayjs | null;
  currentDate: Dayjs | null | 0;
  selectedDay: boolean;
}>();

const subscriptionActive: Ref<Subscription[] | null> = ref(null);

watch(
  () => subscriptionStore.subscriptionsCurrentMonth,
  () => {
    const activeSubscription: Subscription[] = [];
    if (props.day) {
      subscriptionStore.subscriptionsCurrentMonth?.forEach((subscription) => {
        if (
          subscription.nextsPayements.length > 0 &&
          getDayInMonth(subscription.nextsPayements[0]) === props.day
        ) {
          activeSubscription.push(subscription);
        }
      });
    }
    subscriptionActive.value = activeSubscription;
  },
);

// Select day
function handleClickDay() {
  if (props.currentDate) {
    subscriptionStore.setSelectedDate(props.currentDate);
    subscriptionStore.openDetails();
  } else {
    return console.info("No date available");
  }
}
</script>
