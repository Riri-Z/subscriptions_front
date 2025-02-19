<script lang="ts" setup>
import SubscriptionForms from "~/components/forms/SubscriptionForms.vue";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import type { PostSubscriptions } from "~/types/store/subscriptionsStore";
import { useDateStore } from "~/store/dateStore";
import {
  addSubscriptionMessages,
  postSubscriptionMessages,
} from "~/utils/constants/toast-status-message";
const subscriptionStore = useSubscriptionsStore();
const dateStore = useDateStore();
const isSubmiting = ref(false);

async function handlePostSubscription(formData: Partial<PostSubscriptions>) {
  isSubmiting.value = true;
  // TODO : check guard if everything is present
  if (formData.endDate === "") {
    delete formData.endDate;
  }
  try {
    if (subscriptionStore.selectedSubscription) {
      updateSubscription(formData);
    } else {
      addSubscription(formData);
    }
  } catch (error) {
    console.error(
      "Une erreur est survenue durant la tentative de mis à jour ",
      error,
    );
  } finally {
    await subscriptionStore.getSubscriptionsMonthly(
      dateStore.currentDate.set("date", 1).format("YYYY-MM-DD"),
    );
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
    useNuxtApp().$toast.success(postSubscriptionMessages.success);
  } catch (error) {
    console.error("Error while updating subscription", error);
    useNuxtApp().$toast.error(postSubscriptionMessages.error);
  }
}
/**
 * Add a new subscription
 */
async function addSubscription(formData: Partial<PostSubscriptions>) {
  try {
    await subscriptionStore.postUserSubscriptions(formData);
    useNuxtApp().$toast.success(addSubscriptionMessages.success);
  } catch (error) {
    console.error("Error while updating subscription", error);
    useNuxtApp().$toast.error(addSubscriptionMessages.error);
  }
}
</script>
<!-- TODO : If we use multiple modal, update this one with <slot> components -->
<template>
  <Teleport v-if="subscriptionStore.isModalOpen" to="#calendar">
    <div
      v-if="subscriptionStore.isModalOpen"
      class="text-wite bg-card-bg-color my-2 flex w-[310px] flex-col justify-evenly gap-1 rounded-md px-4 md:gap-2 lg:w-[400px] lg:p-4"
    >
      <SubscriptionForms
        :is-submiting="isSubmiting"
        @post-subscription="handlePostSubscription"
      />
    </div>
  </Teleport>
</template>
