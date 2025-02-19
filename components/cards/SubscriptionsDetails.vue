<script lang="ts" setup>
import type { UserSubscription } from "~/types/store/subscriptionsStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import dayjs from "dayjs";
import SubscriptionList from "../subscriptions/SubscriptionList.vue";

const subscriptionStore = useSubscriptionsStore();

defineProps({
  selectedDate: { type: String, default: null },
  subscriptionsCurrentMonth: {
    type: Array as PropType<UserSubscription[]>,
    default: () => [],
  },
});

const handleOpenModalAddSubscription = () => {
  subscriptionStore.openModal();
};

const subscriptionByDay = computed(() => {
  return subscriptionStore.selectedDate
    ? subscriptionStore.getSubscriptionsByDay(dayjs(subscriptionStore.selectedDate))
    : null;
});
</script>

<template>
  <div
    v-if="selectedDate && subscriptionsCurrentMonth"
    class="mb-2 flex w-full flex-col gap-4 rounded-xl bg-secondary p-4 align-middle text-base sm:mb-0 lg:h-[580px] lg:w-[16rem]"
    :style="{ opacity: subscriptionStore.isDeleteModalOpen ? 0.2 : 1 }"
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
    <div class="m-2 mt-auto flex justify-center">
      <button
        class="w-full rounded-lg bg-primary p-2 text-sm text-light"
        @click="handleOpenModalAddSubscription"
      >
        <p class="text-center font-bold">Ajouter un abonnement</p>
      </button>
    </div>
  </div>
</template>
