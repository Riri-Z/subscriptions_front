<template>
  <!-- CALENDAR template-->
  <div
    id="calendar"
    class="text-primary-white-color mx-auto mt-4 flex flex-row lg:h-full lg:items-center lg:justify-center"
  >
    <main
      v-if="!subscriptionStore.isModalOpen"
      class="flex max-h-[600px] flex-col gap-2 lg:mt-0 lg:flex-row"
    >
      <Calendar />
      <CardsSubscriptionsDetails
        v-if="subscriptionStore.getSelectedDate && subscriptionsCurrentMonth"
        :selected-date="
          dayjs(subscriptionStore.getSelectedDate).format('DD-MM-YYYY')
        "
        :subscriptions-current-month="subscriptionsCurrentMonth"
      />
    </main>
    <ModalSubscription />
  </div>
</template>

<script lang="ts" setup>
import Calendar from "~/components/calendar/Calendar.vue";
import dayjs from "dayjs";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
const subscriptionStore = useSubscriptionsStore();
const subscriptionsCurrentMonth = computed(
  () => subscriptionStore?.subscriptionsCurrentMonth,
);

definePageMeta({
  layout: "dashboard",
});
</script>
