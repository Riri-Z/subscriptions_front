<template>
  <div
    v-if="props.label && props.subscription"
    class="m-4 flex w-[80vw] flex-col gap-4 text-center align-middle md:w-[300px]"
  >
    <div class="flex flex-col gap-2">
      <h2 class="text-xl font-semibold text-white">
        {{ $t("deleteSubscriptionPrompt.delete.title") }}
      </h2>
      <p class="mt-1 text-sm text-white">
        {{ $t("deleteSubscriptionPrompt.delete.confirmation") }}&nbsp;:
        {{ props.label }} ?
      </p>
    </div>
    <div class="flex flex-row justify-around gap-1">
      <button
        class="btn-secondary h-10 w-[8rem] rounded-lg text-light"
        :disabled="subscriptionStore.loading"
        @click="handleDeleteSubscription(props.subscription)"
      >
        <span class="flex flex-row items-center justify-center gap-4">
          <NuxtImg
            v-if="subscriptionStore.loading"
            class="animate-spin"
            src="icons/loader-circle.svg"
            width="24"
            height="24"
            alt="spinner"
          />

          <p v-else>{{ $t("deleteSubscriptionPrompt.delete.cta.continue") }}</p>
        </span>
      </button>
      <button
        class="btn-secondary h-10 w-[8rem] rounded-lg text-light"
        :disabled="subscriptionStore.loading"
        @click="handleCancel()"
      >
        <p>{{ $t("deleteSubscriptionPrompt.delete.cta.cancel") }}</p>
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
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const subscriptionStore = useSubscriptionsStore();
const dateStore = useDateStore();
const props = defineProps<{
  label: string | undefined | null;
  subscription: UserSubscription | null;
}>();

async function handleDeleteSubscription(subscription: UserSubscription) {
  if (!subscription || !subscription.id) {
    return useNuxtApp().$toast.error(
      t("toastMessages.deleteSubscriptionMessages.error"),
    );
  }

  subscriptionStore.setLoading(true);
  subscriptionStore.setSelectedSubscription(subscription);
  try {
    const result = await subscriptionStore.deleteSubscription(subscription);
    if (result) {
      useNuxtApp().$toast.success(t(deleteSubscriptionMessages.success));
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'abonnement :", error);
    return useNuxtApp().$toast.error(t(deleteSubscriptionMessages.error));
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
