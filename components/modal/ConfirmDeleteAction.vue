<template>
  <div
    v-if="props.label && props.subscription"
    class="m-4 flex w-[80vw] flex-col gap-4 text-center align-middle md:w-[300px]"
  >
    <h1 class="text-lg">
      Souhaitez-vous supprimer l'abonnement suivant :

      <p class="mt-2 text-center text-base font-bold">
        {{ props.label }}
      </p>
    </h1>
    <div class="flex flex-row justify-around gap-1">
      <button
        class="btn-secondary h-10 w-[8rem] rounded-lg text-light"
        @click="handleDeleteSubscription(props.subscription)"
      >
        <p>Continuer</p>
      </button>
      <button
        class="btn-secondary h-10 w-[8rem] rounded-lg text-light"
        @click="handleCancel()"
      >
        <p>Annuler</p>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ModalStatus,
  type UserSubscription,
} from "~/types/store/subscriptionsStore";
import { deleteSubscriptionMessages } from "~/utils/constants/toast-status-message";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import { useDateStore } from "~/store/dateStore";
import dayjs from "dayjs";

const subscriptionStore = useSubscriptionsStore();
const dateStore = useDateStore();
const props = defineProps<{
  label: string | undefined | null;
  subscription: UserSubscription | null;
}>();

async function handleDeleteSubscription(subscription: UserSubscription) {
  if (!subscription || !subscription.id) {
    return useNuxtApp().$toast.error(deleteSubscriptionMessages.error);
  }

  subscriptionStore.setLoading(true);
  subscriptionStore.setSelectedSubscription(subscription);
  try {
    const result = await subscriptionStore.deleteSubscription(subscription);
    if (result) {
      useNuxtApp().$toast.success(deleteSubscriptionMessages.success);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'abonnement :", error);
    return useNuxtApp().$toast.error(deleteSubscriptionMessages.error);
  } finally {
    subscriptionStore.setLoading(false); // Arrêt du chargement
    await subscriptionStore.getSubscriptionsMonthly(
      dayjs(dateStore.currentDate).set("date", 1).format("YYYY-MM-DD"),
    );
    subscriptionStore.closeModal();
  }
}

function handleCancel() {
  subscriptionStore.setSelectedSubscription(null);
  subscriptionStore.setModalDetails(ModalStatus.NULL, null);
  subscriptionStore.closeModal();
}
</script>
