<script lang="ts" setup>
import {
  ModalStatus,
  type UserSubscription,
} from "~/types/store/subscriptionsStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import dayjs from "dayjs";
import SubscriptionList from "../subscriptions/SubscriptionList.vue";

const { containerHeight } = useCalendarDimensions();

const computedHeight = computed(() => {
  if (window.innerWidth < 1024) {
    return "100%";
  }
  return containerHeight.value + "px";
});

const subscriptionStore = useSubscriptionsStore();

defineProps({
  selectedDate: { type: String, default: null },
  subscriptionsCurrentMonth: {
    type: Array as PropType<UserSubscription[]>,
    default: () => [],
  },
});

const handleOpenModalAddSubscription = () => {
  subscriptionStore.setModalDetails(ModalStatus.ADD, null);
  subscriptionStore.openModal();
};

const subscriptionByDay = computed(() => {
  return subscriptionStore.selectedDate
    ? subscriptionStore.getSubscriptionsByDay(
        dayjs(subscriptionStore.selectedDate),
      )
    : null;
});
</script>

<template>
  <div
    v-if="selectedDate && subscriptionsCurrentMonth"
    class="mb-2 flex h-fit w-full flex-col gap-4 rounded-xl bg-secondary p-4 align-middle text-base shadow-custom sm:mb-0 lg:w-[16rem]"
    :style="{
      maxHeight: computedHeight,
      opacity: subscriptionStore.isModalOpen ? 0.2 : 1,
    }"
  >
    <h1 class="m-1 text-center font-bold">Abonnements actifs :</h1>
    <div
      v-if="subscriptionByDay && subscriptionByDay.length > 0"
      class="flex h-fit flex-col gap-2 overflow-y-auto"
    >
      <!-- LIST OF SUBSCRIPTION -->
      <SubscriptionList :subscription-by-day="subscriptionByDay" />
    </div>
    <div v-else>
      <p class="m-1">Pas de prélevements prévue ce jour</p>
    </div>
    <div class="mt-auto flex justify-center">
      <button
        class="btn-secondary w-full rounded-lg p-2 text-sm text-light"
        @click="handleOpenModalAddSubscription"
      >
        <p class="text-center font-bold">Ajouter un abonnement</p>
      </button>
    </div>
  </div>
</template>
