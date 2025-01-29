<script setup lang="ts">
import type { Subscription } from "~/types/store/subscriptionsStore";

defineProps<{
  subscription: Subscription[];
}>();

const emit = defineEmits<{
  selectSubscription: [subscription: Subscription];
}>();
</script>

<template>
  <div
    class="absolute z-10 flex h-fit w-full flex-col gap-1 rounded-b-md bg-gray-800"
  >
    <span
      v-for="subscription in subscription"
      :key="subscription.id"
      class="flex min-h-10 cursor-pointer items-center gap-2 hover:bg-slate-400"
      @click="emit('selectSubscription', subscription)"
    >
      <img
        class="ml-2"
        v-if="subscription.icon_url"
        :src="subscription.icon_url"
        :alt="subscription.name"
        width="18"
        height="18"
      >
      </img>
      <p>{{ subscription.name }}</p>
    </span>
  </div>
</template>
