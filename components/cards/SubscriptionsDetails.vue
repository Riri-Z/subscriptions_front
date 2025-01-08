<script lang="ts" setup>
import type { Subscription } from "~/types/store/subscriptionsStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";

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
</script>

<template>
  <div
    v-if="selectedDate && subscriptionsCurrentMonth"
    class="flex h-[300px] w-full flex-col justify-between rounded-xl bg-black p-4 align-middle lg:h-full lg:w-56"
  >
    <h1 class="text-center">Vos prélévements prévus le {{ selectedDate }}</h1>
    <div
      v-if="subscriptionsCurrentMonth && subscriptionsCurrentMonth.length > 0"
      class="flex max-h-[300px] flex-col gap-2 overflow-y-auto"
    >
      <div
        v-for="subscription in subscriptionsCurrentMonth"
        class="mx-2 flex cursor-pointer flex-col rounded-md p-2 text-sm odd:bg-gray-900 even:bg-gray-700 hover:bg-green-color"
        :key="subscription.id"
      >
        <!-- Each subscription details -->
        <section class=" ">
          <p>Nom : {{ subscription?.subscription?.name }}</p>
          <p>Montant : {{ subscription?.amount }} €</p>
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
