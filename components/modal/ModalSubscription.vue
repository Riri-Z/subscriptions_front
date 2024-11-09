<script lang="ts" setup>
import SubscriptionForms from "~/components/forms/SubscriptionForms.vue";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import type { PostSubscriptions } from "~/types/store/subscriptionsStore";
const subscriptionStore = useSubscriptionsStore();

async function handlePostSubscription(formData: Partial<PostSubscriptions>) {
  if (formData.endDate === "") {
    delete formData.endDate;
  }
  try {
    await subscriptionStore.postUserSubscriptions(formData);
  } catch (error) {
    console.error(error);
  } finally {
    subscriptionStore.closeModal();
  }
}
</script>
<!-- TODO : If we use multiple modal, update this one with <slot> components -->
<template>
  <Teleport v-if="subscriptionStore.isModalOpen" to="#sidebar">
    <div
      v-if="subscriptionStore.isModalOpen"
      class="fixed left-[41%] top-[10%] z-[50] flex w-[400px] max-w-lg flex-col justify-evenly gap-2 rounded-lg bg-purple-800 p-6"
    >
      <SubscriptionForms @post-subscription="handlePostSubscription" />
    </div>
  </Teleport>
</template>
