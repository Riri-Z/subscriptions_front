<template>
  <div class="relative w-full bg-red-500">
    <BadgeSubscription
      v-for="(subscription, index) in activeSubscription"
      :key="subscription.id"
      :name="subscription.subscription.name"
      :index="index"
    />
  </div>
</template>

<script lang="ts" setup>
import type { UserSubscription } from "~/types/store/subscriptionsStore";
import BadgeSubscription from "./BadgeSubscription.vue";

defineProps<{
  activeSubscription: UserSubscription[];
}>();
</script>
