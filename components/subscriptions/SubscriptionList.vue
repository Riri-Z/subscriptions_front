<template>
  <div
    v-for="subscription in subscriptionByDay"
    :key="subscription.id"
    class="hover:bg-green-color flex cursor-pointer flex-col rounded-md text-sm odd:bg-primary even:bg-gray-600"
  >
    <!-- Each subscription details -->
    <span class="flex flex-row p-2">
      <SubscriptionItem
        :subscription="subscription"
        :name="subscription.subscription.name"
        :amount="subscription.amount"
      />
      <!-- Action EDIT / DELETE subscription -->
      <div class="my-auto ml-auto flex gap-2">
        <CardsTooltip
          :position="'right'"
          :content="tooltipMessages.subscriptionsDetails.edit"
        >
          <NuxtImg
            class="m-auto cursor-pointer hover:scale-105"
            alt="clipboard icon"
            src="/icons/edit.svg"
            width="24"
            height="24"
            @click="handleOpenModal(ModalStatus.EDIT, subscription)"
          />
        </CardsTooltip>

        <CardsTooltip
          :position="'right'"
          :content="tooltipMessages.subscriptionsDetails.delete"
        >
          <NuxtImg
            class="m-auto cursor-pointer hover:scale-105"
            alt="clipboard delete icon"
            src="/icons/remove.svg"
            width="24"
            height="24"
            @click="handleOpenModal(ModalStatus.DELETE, subscription)"
          />
        </CardsTooltip>
      </div>
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { UserSubscription } from "~/types/store/subscriptionsStore";
import SubscriptionItem from "./SubscriptionItem.vue";
import { tooltipMessages } from "~/utils/constants/tooltip-messages";

defineProps<{
  subscriptionByDay: UserSubscription[];
}>();

function handleOpenModal(action: ModalStatus, subscription: UserSubscription) {
  subscriptionStore.setSelectedSubscription(subscription);
  subscriptionStore.setModalDetails(action, subscription);
  subscriptionStore.openModal();
}
</script>
