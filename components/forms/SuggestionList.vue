<script setup lang="ts">
import type { AvailableSuggestionSubscriptionWithIcon } from "~/types/store/subscriptionsStore";

defineProps<{
  availableSuggestionSubscription: AvailableSuggestionSubscriptionWithIcon[];
}>();

const emit = defineEmits<{
  selectSubscription: [subscription: AvailableSuggestionSubscriptionWithIcon];
}>();
</script>

<template>
  <div
    class="bg-deep-green-color absolute z-10 flex h-fit w-full flex-col gap-1 rounded-b-md"
  >
    <span
      v-for="subscription in availableSuggestionSubscription"
      :key="subscription.id"
      class="flex min-h-10 cursor-pointer items-center gap-2 hover:bg-slate-400"
      @click="emit('selectSubscription', subscription)"
    >
      <img
        v-if="subscription.icon_url"
        class="ml-2"
        :src="subscription.icon_url"
        :alt="subscription.name"
        width="18"
        height="18"
      />

      <p>{{ subscription.name }}</p>
    </span>
  </div>
</template>
