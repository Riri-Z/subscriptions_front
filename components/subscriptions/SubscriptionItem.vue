<template>
  <section class="flex cursor-default flex-row justify-between p-2 rounded-md">
    <div>
      <p class="overflow-hidden overflow-ellipsis whitespace-nowrap lg:max-w-32">
        Nom : {{ name }}
      </p>
      <p>Montant : {{ amount }} €</p>
    </div>
    <div class="bg-red flex items-center gap-2">
      <NuxtImg
        class="m-auto cursor-pointer"
        alt="clipboard icon"
        src="/icons/edit.svg"
        width="24"
        height="24"
        @click="handleClickSubscriptionDetail(subscription)"
      />
      <NuxtImg
        class="m-auto cursor-pointer"
        alt="clipboard delete icon"
        src="/icons/remove.svg"
        width="24"
        height="24"
        @click="handleOpenConfirmationDelete(subscription)"
      />
    </div>
    <Teleport to="body">
      <CardsConfirmDeleteAction
        v-if="
          labelConfirmAction &&
          subscriptionStore.selectedSubscription &&
          subscriptionStore.isDeleteModalOpen
        "
        :label="labelConfirmAction"
        :subscription="subscriptionStore.selectedSubscription"
        @delete-subscription="handleDeleteSubscription"
        @cancel-action="handleCancelDeleteSubscription"
      />
    </Teleport>
  </section>
</template>

<script lang="ts" setup>
import { useDateStore } from "~/store/dateStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import type { UserSubscription } from "~/types/store/subscriptionsStore";
import { deleteSubscriptionMessages } from "~/utils/constants/toast-status-message";
const labelConfirmAction: Ref<string | null> = ref(null);

const dateStore = useDateStore();
const subscriptionStore = useSubscriptionsStore();
defineProps<{
  name: string;
  amount: number;
  subscription: UserSubscription;
}>();

/**
 *- Open the selected subscription
 */
function handleClickSubscriptionDetail(subscription: UserSubscription) {
  if (subscriptionStore.isDeleteModalOpen) return;
  subscriptionStore.setSelectedSubscription(subscription);
  subscriptionStore.openModal();
}

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
      dateStore.currentDate.set("date", 1).format("YYYY-MM-DD")
    );
    subscriptionStore.closeDeleteModal();
  }
}

/**
 *- Close the delete modal
 */
function handleCancelDeleteSubscription() {
  subscriptionStore.setSelectedSubscription(null);
  labelConfirmAction.value = null;
  subscriptionStore.closeDeleteModal();
}

function handleOpenConfirmationDelete(subscription: UserSubscription) {
  if (subscriptionStore.isDeleteModalOpen) return;
  subscriptionStore.setSelectedSubscription(subscription);
  labelConfirmAction.value = subscription.subscription.name;
  subscriptionStore.openDeleteModal();
}
</script>
