<template>
  <button
    class="flex h-12 flex-col rounded-xl p-2 sm:h-14 lg:h-16 lg:gap-2 xl:h-20"
    :class="{
      'bg-slate-500': day !== null && !selectedDay,
      'bg-slate-800': day === null,
      'bg-green-800': selectedDay,
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
