<template>
  <!-- CALENDAR template-->
  <div
    id="calendar"
    class="text-light mx-auto mt-4 flex flex-row lg:h-full lg:items-center lg:justify-center"
  >
    <main
      v-if="!subscriptionStore.isModalOpen"
      class="flex max-h-[600px] flex-col gap-2 lg:mt-0 lg:flex-row"
    >
      <Calendar />
      <CardsSubscriptionsDetails
        v-if="
          subscriptionStore.getSelectedDate &&
          subscriptionStore?.subscriptionsCurrentMonth
        "
        :selected-date="dayjs(subscriptionStore.getSelectedDate).format('DD-MM-YYYY')"
        :subscriptions-current-month="subscriptionStore?.subscriptionsCurrentMonth"
      />
    </main>
    <ModalSubscription />
  </div>
</template>

<script lang="ts" setup>
import Calendar from "~/components/calendar/Calendar.vue";
import dayjs from "dayjs";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import { useDateStore } from "~/store/dateStore";
const subscriptionStore = useSubscriptionsStore();
const dateStore = useDateStore();

// Reset calendar
onMounted(async () => {
  const currentDate = dayjs(new Date());
  dateStore.setCurrentDate(currentDate);
  subscriptionStore.setSelectedDate(currentDate);
  await subscriptionStore.getSubscriptionsMonthly(currentDate.format("YYYY-MM-DD"));
  dateStore.setDaysInMonth(currentDate);
});

definePageMeta({
  layout: "dashboard",
});
</script>
