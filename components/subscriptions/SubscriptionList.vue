<template>
  <div
    v-for="subscription in subscriptionByDay"
    :key="subscription.id"
    class="hover:bg-green-color flex cursor-pointer flex-col rounded-md text-sm odd:bg-primary even:bg-gray-600"
  >
    <!-- Each subscription details -->
    <span class="relative flex flex-row p-2">
      <SubscriptionItem
        :subscription="subscription"
        :name="subscription.subscription.name"
        :amount="subscription.amount"
      />
      <!-- Action EDIT / DELETE subscription -->
      <div class="relative my-auto ml-auto flex gap-2">
        <CardsTooltip
          :position="'top-right'"
          offset="2"
          :content="$t('tooltips.subscriptionDetails.edit')"
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

        <span @click="handleOpenModal(ModalStatus.DELETE, subscription)">
          <CardsTooltip
            :position="'top-right'"
            offset="2"
            :content="$t('tooltips.subscriptionDetails.delete')"
          >
            <NuxtImg
              class="m-auto cursor-pointer hover:scale-105"
              alt="clipboard delete icon"
              src="/icons/remove.svg"
              width="24"
              height="24"
            />
          </CardsTooltip>
        </span>
      </div>
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { UserSubscription } from "~/types/store/subscriptionsStore";
import SubscriptionItem from "./SubscriptionItem.vue";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import { ModalStatus } from "~/types/store/subscriptionsStore";

const subscriptionStore = useSubscriptionsStore();
defineProps<{
  subscriptionByDay: UserSubscription[];
}>();

function handleOpenModal(action: ModalStatus, subscription: UserSubscription) {
  subscriptionStore.setSelectedSubscription(subscription);
  subscriptionStore.setModalDetails(action, subscription);
  subscriptionStore.openModal();
}
</script>
