<script lang="ts" setup>
import SubscriptionForms from "~/components/forms/SubscriptionForms.vue";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import type { PostSubscriptions } from "~/types/store/subscriptionsStore";
import { useDateStore } from "~/store/dateStore";
import { postSubscriptionMessages } from "~/utils/constants/toast-status-message";
const subscriptionStore = useSubscriptionsStore();
const dateStore = useDateStore();

async function handlePostSubscription(formData: Partial<PostSubscriptions>) {
  // TODO : check guard if everything is present
  if (formData.endDate === "") {
    delete formData.endDate;
  }
  try {
    if (subscriptionStore.selectedSubscription) {
      await subscriptionStore.updateSubscription(formData);
    } else {
      await subscriptionStore.postUserSubscriptions(formData);
    }
    useNuxtApp().$toast.success(postSubscriptionMessages.success);
  } catch (error) {
    console.error(
      "Une erreur est survenue durant la tentative de mis à jour ",
      error,
    );
    useNuxtApp().$toast.error(postSubscriptionMessages.error);
  } finally {
    await subscriptionStore.getSubscriptionsMonthly(
      dateStore.currentDate.set("date", 1).format("YYYY-MM-DD"),
    );
    subscriptionStore.closeModal();
  }
}
</script>
<!-- TODO : If we use multiple modal, update this one with <slot> components -->
<template>
  <Teleport v-if="subscriptionStore.isModalOpen" to="#calendar">
    <div
      v-if="subscriptionStore.isModalOpen"
      class="text-wite my-2 flex w-[310px] flex-col justify-evenly gap-1 rounded-lg bg-card-color px-4 md:gap-2 lg:w-[400px] lg:p-4"
    >
      <SubscriptionForms @post-subscription="handlePostSubscription" />
    </div>
  </Teleport>
</template>
