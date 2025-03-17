<template>
  <section class="flex cursor-default flex-row justify-between rounded-md p-2">
    <div>
      <p
        class="overflow-hidden overflow-ellipsis whitespace-nowrap lg:max-w-32"
      >
        {{ $t("subscriptionDetails.item.name") }} : {{ name }}
      </p>
      <p>{{ $t("subscriptionDetails.item.amount") }} : {{ amount }} €</p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { UserSubscription } from "~/types/store/subscriptionsStore";

defineProps<{
  name: string;
  amount: number;
  subscription: UserSubscription;
}>();
</script>
