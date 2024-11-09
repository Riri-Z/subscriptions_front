<script lang="ts" setup>
import type { Subscription } from "~/types/store/subscriptionsStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";

const subscriptionStore = useSubscriptionsStore();

defineProps({
  selectedDate: { type: String },
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
    class="flex w-56 flex-col justify-between rounded-xl bg-black p-10 align-middle"
  >
    <h1 class="text-center">
      Vos prélévements prévus ce jour : {{ selectedDate }}
    </h1>
    <div
      v-if="subscriptionsCurrentMonth && subscriptionsCurrentMonth.length > 0"
      class="flex max-h-[250px] flex-col gap-4 overflow-y-auto"
    >
      <div
        v-for="subscription in subscriptionsCurrentMonth"
        :key="subscription.id"
      >
        <!-- ToDO  : display sub name / amount if nextsPayements includes selectedDate  -->
        <section class="text-s flex flex-col">
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
        class="flex flex-col rounded-xl bg-purple-500 p-2 text-sm"
        @click="handleOpenModalAddSubscription"
      >
        Ajouter un abonnement
      </button>
    </div>
  </div>
</template>
