<template>
  <button
    class="flex h-12 cursor-pointer flex-col rounded-xl p-2 sm:h-14 lg:h-16 lg:gap-2 xl:h-20"
    :class="{
      'bg-slate-500': currentMonth && !selectedDay,
      'bg-slate-800': !currentMonth,
      'bg-green-800': currentMonth && selectedDay,
    }"
    @click="handleClickDay"
  >
    <p class="text-sm lg:text-base">{{ day }}</p>
    <section
      v-if="subscriptionActive"
      class="flex flex-row self-center sm:gap-1"
    >
      <BadgeSubscription
        v-for="subscription in subscriptionActive"
        :key="subscription.id"
        :name="subscription.subscription.name"
      />
    </section>
  </button>
</template>

<script lang="ts" setup>
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import { Dayjs } from "dayjs";
import type { Subscription } from "~/types/store/subscriptionsStore";
import { useDateStore } from "~/store/dateStore";

const dateStore = useDateStore();
const emit = defineEmits(["onNextMonth", "onPreviousMonth"]);
const subscriptionStore = useSubscriptionsStore();

const props = defineProps<{
  day: null | number;
  sourceDate: Dayjs | null;
  currentMonth: boolean;
  currentDate: Dayjs;
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
          useDate().getDayInMonth(subscription.nextsPayements[0]) === props.day
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
  if (!props.currentMonth) return;
  if (props.currentDate) {
    // In case user click on date in previous month

    if (props.sourceDate && props.currentDate < props.sourceDate) {
      /*      dateStore.setPreviousMonth(); */
      subscriptionStore.setSelectedDate(props.currentDate.subtract(1, "month"));
    }
    // In case user click on date in next month
    if (props.sourceDate && props.currentDate > props.sourceDate) {
      /*      dateStore.setNextMonth(); */

      subscriptionStore.setSelectedDate(props.currentDate.add(1, "month"));
    }
    subscriptionStore.setSelectedDate(props.currentDate);

    subscriptionStore.openDetails();
  } else {
    return console.info("No date available");
  }
}
</script>
