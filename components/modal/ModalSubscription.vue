<script lang="ts" setup>
import SubscriptionForms from "~/components/forms/SubscriptionForms.vue";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import type { PostSubscriptions } from "~/types/store/subscriptionsStore";
import { useDateStore } from "~/store/dateStore";
import { postSubscriptionMessages } from "~/utils/constants/Constants";
const subscriptionStore = useSubscriptionsStore();
const dateStore = useDateStore();

async function handlePostSubscription(formData: Partial<PostSubscriptions>) {
  if (!formData.id) {
    return useNuxtApp().$toast.error(
      postSubscriptionMessages.subscriptionIncomplet,
    );
  }
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
      class="my-4 flex w-[90vw] flex-col justify-evenly gap-1 rounded-lg bg-white p-4 text-black md:gap-2 lg:w-[400px]"
    >
      <SubscriptionForms @post-subscription="handlePostSubscription" />
    </div>
  </Teleport>
</template>
