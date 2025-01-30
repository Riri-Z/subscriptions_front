<script lang="ts" setup>
import type { UserSubscription } from "~/types/store/subscriptionsStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import dayjs from "dayjs";
import { useDateStore } from "~/store/dateStore";
import { deleteSubscriptionMessages } from "~/utils/constants/toast-status-message";

const subscriptionStore = useSubscriptionsStore();
const dateStore = useDateStore();
defineProps({
  selectedDate: { type: String },
  subscriptionsCurrentMonth: {
    type: Array as PropType<UserSubscription[]>,
    default: () => [],
  },
});

const labelConfirmAction: Ref<string | null> = ref(null);

const handleOpenModalAddSubscription = () => {
  subscriptionStore.openModal();
};

function handleOpenConfirmationDelete(subscription: UserSubscription) {
  subscriptionStore.setSelectedSubscription(subscription);
  labelConfirmAction.value = subscription.subscription.name;
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
      dateStore.currentDate.set("date", 1).format("YYYY-MM-DD"),
    );
  }
}

function handleClickSubscriptionDetail(subscription: UserSubscription) {
  subscriptionStore.setSelectedSubscription(subscription);
  subscriptionStore.openModal();
}

function handleCancel() {
  subscriptionStore.setSelectedSubscription(null);
  labelConfirmAction.value = null;
}

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
    class="flex w-full flex-col gap-4 rounded-xl bg-black bg-opacity-15 p-4 align-middle text-base md:w-full lg:h-full lg:w-fit 2xl:w-[15vw]"
  >
    <h1 class="m-1 text-center">Abonnements actifs :</h1>
    <div
      v-if="subscriptionByDay && subscriptionByDay.length > 0"
      class="flex h-fit flex-col gap-2 overflow-y-auto"
    >
      <!-- LIST OF SUBSCRIPTION -->
      <div
        v-for="subscription in subscriptionByDay"
        class="mx-2 flex cursor-pointer flex-col rounded-md p-2 odd:bg-gray-900 even:bg-gray-700 hover:bg-green-color"
        :key="subscription.id"
      >
        <!-- Each subscription details -->
        <section class="flex flex-row justify-between">
          <div>
            <p>Nom : {{ subscription?.subscription?.name }}</p>
            <p>Montant : {{ subscription?.amount }} €</p>
          </div>
          <div class="bg-red flex items-center gap-2">
            <NuxtImg
              class="m-auto"
              alt="clipboard icon"
              src="/icons/edit.svg"
              width="24"
              height="24"
              @click="handleClickSubscriptionDetail(subscription)"
            />
            <NuxtImg
              class="m-auto"
              alt="clipboard delete icon"
              src="/icons/remove.svg"
              width="24"
              height="24"
              @click="handleOpenConfirmationDelete(subscription)"
            />
          </div>
        </section>
      </div>
    </div>
    <div v-else>
      <p class="m-1">Pas de prélevements prévue ce jour</p>
    </div>
    <div class="m-2 mt-auto flex justify-center">
      <button
        class="w-full rounded-md bg-green-color p-2 text-sm"
        @click="handleOpenModalAddSubscription"
      >
        <p class="text-center">Ajouter un abonnement</p>
      </button>
    </div>
    <CardsConfirmDeleteAction
      v-if="labelConfirmAction && subscriptionStore.selectedSubscription"
      :label="labelConfirmAction"
      :subscription="subscriptionStore.selectedSubscription"
      @delete-subscription="handleDeleteSubscription"
      @cancel-action="handleCancel"
    />
  </div>
</template>
