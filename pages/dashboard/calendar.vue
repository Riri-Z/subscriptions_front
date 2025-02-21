<template>
  <!-- CALENDAR template-->
  <div
    id="calendar"
    class="mx-auto mt-4 flex flex-row text-light lg:mt-0 lg:h-full lg:items-center lg:justify-center"
  >
    <main
      v-if="statusValue === 'authenticated' && !subscriptionStore.isModalOpen"
      class="flex flex-col gap-2 lg:mt-0 lg:flex-row"
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
const { status } = useAuth();

const statusValue = computed(() => status.value);
const subscriptionStore = useSubscriptionsStore();

definePageMeta({
  layout: "dashboard",
});
</script>
