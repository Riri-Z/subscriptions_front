<template>
  <!-- CALENDAR -->
  <div
    id="calendar"
    class="mx-auto mt-4 flex flex-row text-primary-white-color md:m-auto lg:justify-center"
  >
    <main
      v-if="!subscriptionStore.isModalOpen"
      class="flex flex-col gap-4 lg:mt-0 lg:flex-row"
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
import Calendar from "~/components/Calendar.vue";
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
