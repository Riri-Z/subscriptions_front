<script lang="ts" setup>
import dayjs from "dayjs";
import SubscriptionForms from "~/components/forms/SubscriptionForms.vue";
import { useDateStore } from "~/store/dateStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import {
  ModalStatus,
  type PostSubscriptions,
} from "~/types/store/subscriptionsStore";
import {
  addSubscriptionMessages,
  postSubscriptionMessages,
} from "~/utils/constants/toast-status-message";
const subscriptionStore = useSubscriptionsStore();
const isSubmiting = ref(false);

const { t } = useI18n();
async function handlePostSubscription(formData: Partial<PostSubscriptions>) {
  isSubmiting.value = true;
  // TODO : check guard if everything is present
  if (formData.endDate === "") {
    delete formData.endDate;
  }
  formData.subscriptionName = String(formData.subscriptionName);
  try {
    if (subscriptionStore.modalDetails.action === ModalStatus.EDIT) {
      updateSubscription(formData);
    } else {
      addSubscription(formData);
    }

    /*  */
  } catch (error) {
    console.error(
      "Une erreur est survenue durant la tentative de mis à jour ",
      error,
    );
  } finally {
    isSubmiting.value = false;
    subscriptionStore.closeModal();
  }
}

/**
 * Update subscription
 */
async function updateSubscription(formData: Partial<PostSubscriptions>) {
  try {
    await subscriptionStore.updateSubscription(formData);
    useNuxtApp().$toast.success(t(postSubscriptionMessages.success));
  } catch (error) {
    console.error("Error while updating subscription", error);
    useNuxtApp().$toast.error(t(postSubscriptionMessages.error));
  } finally {
    subscriptionStore.getSubscriptionsMonthly(
      dayjs(useDateStore().getCurrentDate).set("date", 1).format("YYYY-MM-DD"),
    );
  }
}
/**
 * Add a new subscription
 */
async function addSubscription(formData: Partial<PostSubscriptions>) {
  try {
    await subscriptionStore.postUserSubscriptions(formData);
    useNuxtApp().$toast.success(t(addSubscriptionMessages.success));
  } catch (error) {
    console.error("Error while updating subscription", error);
    useNuxtApp().$toast.error(t(addSubscriptionMessages.error));
  } finally {
    subscriptionStore.getSubscriptionsMonthly(
      dayjs(useDateStore().getCurrentDate).set("date", 1).format("YYYY-MM-DD"),
    );
  }
}
</script>
<template>
  <div
    class="text-wite bg-card-bg-color flex w-[310px] flex-col justify-evenly gap-1 rounded-md px-4 lg:w-[400px] lg:p-4"
  >
    <SubscriptionForms
      :is-submiting="isSubmiting"
      @post-subscription="handlePostSubscription"
    />
  </div>
</template>
