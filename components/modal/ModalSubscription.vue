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
      class="absolute left-1/2 top-[3%] z-[50] flex min-w-80 -translate-x-1/2 flex-col justify-evenly gap-2 rounded-lg bg-white p-6 md:top-[20%] md:w-[300px] lg:w-[400px]"
    >
      <SubscriptionForms @post-subscription="handlePostSubscription" />
    </div>
  </Teleport>
</template>
