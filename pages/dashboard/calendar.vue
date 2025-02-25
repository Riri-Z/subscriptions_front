<template>
  <!-- CALENDAR template-->
  <div
    id="calendar"
    class="mx-auto mt-4 flex flex-row text-light lg:mt-0 lg:h-full lg:items-center lg:justify-center"
  >
    <!-- Overlay  -->
    <div
      v-if="subscriptionStore.isModalOpen"
      class="fixed inset-0 z-40 bg-black bg-opacity-50"
      @click="subscriptionStore.closeModal()"
    />
    <main
      v-if="statusValue === 'authenticated'"
      class="flex flex-col gap-2 lg:mt-0 lg:flex-row"
    >
      <Calendar />
      <CardsSubscriptionsDetails
        v-if="
          subscriptionStore.getSelectedDate &&
          subscriptionStore?.subscriptionsCurrentMonth
        "
        :selected-date="
          dayjs(subscriptionStore.getSelectedDate).format('DD-MM-YYYY')
        "
        :subscriptions-current-month="
          subscriptionStore?.subscriptionsCurrentMonth
        "
      />
    </main>
    <ModalCustomModal v-if="subscriptionStore.isModalOpen">
      <ModalConfirmDeleteAction
        v-if="subscriptionStore.modalDetails.action === ModalStatus.DELETE"
        :label="
          subscriptionStore?.modalDetails?.subscriptionDetails?.subscription
            ?.name
        "
        :subscription="subscriptionStore?.modalDetails?.subscriptionDetails"
      />
      <ModalSubscription v-else />
    </ModalCustomModal>
  </div>
</template>

<script lang="ts" setup>
import Calendar from "~/components/calendar/Calendar.vue";
import ModalSubscription from "~/components/modal/ModalSubscription.vue";
import dayjs from "dayjs";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import { ModalStatus } from "~/types/store/subscriptionsStore";
const { status } = useAuth();

const statusValue = computed(() => status.value);
const subscriptionStore = useSubscriptionsStore();

definePageMeta({
  layout: "dashboard",
});
</script>
