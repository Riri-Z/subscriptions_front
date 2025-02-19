<template>
  <div
    v-for="subscription in subscriptionByDay"
    :key="subscription.id"
    class="hover:bg-green-color even:bg-odd odd:bg-primary flex cursor-pointer flex-col rounded-md text-sm"
  >
    <!-- Each subscription details -->
    <SubscriptionItem
      :subscription="subscription"
      :name="subscription.subscription.name"
      :amount="subscription.amount"
    />
  </div>
</template>

<script lang="ts" setup>
import type { UserSubscription } from "~/types/store/subscriptionsStore";
import SubscriptionItem from "./SubscriptionItem.vue";

defineProps<{
  subscriptionByDay: UserSubscription[];
}>();
</script>
