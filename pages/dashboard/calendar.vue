<template>
  <div class="m-auto text-primary-white-color">
    <Calendar />
  </div>
</template>

<script lang="ts" setup>
import Calendar from "~/components/Calendar.vue";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";

const subscriptionStore = useSubscriptionsStore();

onMounted(async () => {
  await subscriptionStore.getAllSubscriptions();
});

definePageMeta({
  layout: "dashboard",
});
</script>
