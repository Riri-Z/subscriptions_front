<template>
  <section class="flex cursor-default flex-row justify-between rounded-md p-2">
    <div>
      <p
        class="overflow-hidden overflow-ellipsis whitespace-nowrap lg:max-w-32"
      >
        Nom : {{ name }}
      </p>
      <p>Montant : {{ amount }} €</p>
    </div>
    <div class="flex items-center gap-2">
      <span>
        <NuxtImg
          class="m-auto cursor-pointer hover:animate-custom-bounce"
          alt="clipboard icon"
          src="/icons/edit.svg"
          width="24"
          height="24"
          @click="handleOpenModal(ModalStatus.EDIT, subscription)"
        />
      </span>
      <NuxtImg
        class="m-auto cursor-pointer hover:animate-custom-bounce"
        alt="clipboard delete icon"
        src="/icons/remove.svg"
        width="24"
        height="24"
        @click="handleOpenModal(ModalStatus.DELETE, subscription)"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import type { UserSubscription } from "~/types/store/subscriptionsStore";
import { ModalStatus } from "~/types/store/subscriptionsStore";

const subscriptionStore = useSubscriptionsStore();
defineProps<{
  name: string;
  amount: number;
  subscription: UserSubscription;
}>();

function handleOpenModal(action: ModalStatus, subscription: UserSubscription) {
  subscriptionStore.setSelectedSubscription(subscription);
  subscriptionStore.setModalDetails(action, subscription);
  subscriptionStore.openModal();
}
</script>
