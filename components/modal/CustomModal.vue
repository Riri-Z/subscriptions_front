<template>
  <dialog
    :open="subscriptionStore.openModal"
    class="modal flex justify-center align-middle text-xl"
  >
    <slot />
  </dialog>
</template>

<script setup>
import { useSubscriptionsStore } from "~/store/subscriptionsStore";

const subscriptionStore = useSubscriptionsStore();
defineOptions({
  name: "CustomModal",
});
</script>
