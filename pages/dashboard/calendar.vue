<template>
  <div
    class="m-auto flex flex-row text-primary-white-color lg:w-9/12 lg:justify-center"
  >
    <main
      v-if="!subscriptionStore.isModalOpen"
      class="mt-2 flex flex-col gap-2 lg:mt-0 lg:flex-row"
    >
      <Calendar />
      <CardsSubscriptionsDetails
        v-if="selectedDate && subscriptionsCurrentMonth"
        :selected-date="dayjs(selectedDate).format('DD-MM-YYYY')"
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
const selectedDate = computed(() => subscriptionStore.selectedDate);
definePageMeta({
  layout: "dashboard",
});
</script>
