<template>
  <dialog
    :open="subscriptionStore.openModal"
    class="modal text-xl flex justify-center align-middle"
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
