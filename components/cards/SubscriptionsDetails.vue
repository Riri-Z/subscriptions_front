<script lang="ts" setup>
import type { Subscription } from "~/types/store/subscriptionsStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import dayjs from "dayjs";

const subscriptionStore = useSubscriptionsStore();

defineProps({
  selectedDate: { type: String },
  // get subsSelectedDate
  subscriptionsCurrentMonth: {
    type: Array as PropType<Subscription[]>,
    default: () => [],
  },
});

const handleOpenModalAddSubscription = () => {
  subscriptionStore.openModal();
};

function handleClickSubscriptionDetail(subscription: Subscription) {
  subscriptionStore.setSelectedSubscription(subscription);
  subscriptionStore.openModal();
}

const subscriptionByDay: Ref<Subscription[] | null> = ref(null);
// Filter subscription by selected day
watch(
  () => subscriptionStore.selectedDate,
  () => {
    subscriptionByDay.value = subscriptionStore.selectedDate
      ? subscriptionStore.getSubscriptionsByDay(
          dayjs(subscriptionStore.selectedDate),
        )
      : null;
  },
);
</script>

<template>
  <div
    v-if="selectedDate && subscriptionsCurrentMonth"
    class="flex h-[300px] w-full flex-col gap-4 rounded-xl bg-black p-4 align-middle md:justify-around lg:h-full lg:w-4/6"
  >
    <h1 class="text-center">Vos prélévements prévus le {{ selectedDate }}</h1>
    <div
      v-if="subscriptionsCurrentMonth && subscriptionsCurrentMonth.length > 0"
      class="flex max-h-[300px] flex-col gap-2 overflow-y-auto"
    >
      <!-- LIST OF SUBSCRIPTION -->
      <div
        v-for="subscription in subscriptionByDay"
        class="mx-2 flex cursor-pointer flex-col rounded-md p-2 text-sm odd:bg-gray-900 even:bg-gray-700 hover:bg-green-color"
        :key="subscription.id"
        @click="handleClickSubscriptionDetail(subscription)"
      >
        <!-- Each subscription details -->
        <section class="flex flex-row justify-between">
          <div>
            <p>Nom : {{ subscription?.subscription?.name }}</p>
            <p>Montant : {{ subscription?.amount }} €</p>
          </div>
          <div class="bg-red flex items-center">
            <NuxtImg
              class="m-auto"
              alt="clipboard icon"
              src="/icons/edit.svg"
              width="24"
              height="24"
            />
          </div>
        </section>
      </div>
    </div>
    <div v-else>
      <p>Pas de prélevements prévue</p>
    </div>
    <div class="flex justify-center">
      <button
        class="w-full rounded-md bg-green-color p-2 text-sm"
        @click="handleOpenModalAddSubscription"
      >
        <p class="text-center">Ajouter un abonnement</p>
      </button>
    </div>
  </div>
</template>
