<template>
  <div class="m-auto flex flex-row text-primary-white-color">
    <main v-if="!subscriptionStore.isModalOpen" class="flex">
      <Calendar />
      <div class="w-52 bg-blue-500">
        <h1>DEPENSES DETAILS ON CLICK ICONS</h1>
        <div
          v-for="subscription in subscriptionStore.subscriptionsCurrentMonth"
        >
          <p>
            {{ subscription.subscription.name }} : {{ subscription.amount }}
          </p>
        </div>
      </div>
    </main>
    <ModalSubscription></ModalSubscription>
  </div>
</template>

<script lang="ts" setup>
import Calendar from "~/components/Calendar.vue";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
const subscriptionStore = useSubscriptionsStore();

console.log(
  " subscriptionStore.subscriptionsCurrentMonth",
  subscriptionStore.subscriptionsCurrentMonth,
);
definePageMeta({
  layout: "dashboard",
});
</script>
