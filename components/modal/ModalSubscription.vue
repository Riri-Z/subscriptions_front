<script lang="ts" setup>
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import SubscriptionForms from "~/components/forms/SubscriptionForms.vue";
const subscriptionStore = useSubscriptionsStore();

function handlePostSubscription(formData: any) {
  console.log("test", formData);
}
</script>
<!-- TODO : If we use multiple modal, update this one with <slot> components -->
<template>
  <Teleport v-if="subscriptionStore.isModalOpen" to="#sidebar">
    <div
      v-if="subscriptionStore.isModalOpen"
      class="fixed left-[41%] top-[10%] z-[50] flex w-[400px] max-w-lg flex-col justify-evenly gap-2 rounded-lg bg-purple-800 p-6"
    >
      <h1 class="py-4 text-center text-2xl text-primary-white-color">
        Ajouter un abonnement
      </h1>
      <SubscriptionForms @post-subscription="handlePostSubscription" />
    </div>
  </Teleport>
</template>
