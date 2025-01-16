<template>
  <button
    class="flex h-12 cursor-pointer flex-col rounded-xl p-2 sm:h-14 lg:h-16 lg:gap-2 xl:h-20"
    :class="{
      'bg-slate-500': currentMonth && !selectedDay,
      'bg-slate-800': !currentMonth && !selectedDay,
      'bg-green-800': selectedDay,
    }"
    @click="handleClickDay(props.currentDate)"
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

const subscriptionActive = computed(() => {
  return subscriptionStore.selectedDate
    ? subscriptionStore.getSubscriptionsByDay(
      props.currentDate
      )
    : null;
});


// Select day
async function handleClickDay(day: Dayjs) {
  try {
    if (props.currentDate) {
      subscriptionStore.setSelectedDate(day);
      dateStore.setCurrentDate(day);
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
