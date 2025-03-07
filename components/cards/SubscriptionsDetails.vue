<script lang="ts" setup>
import {
  ModalStatus,
  type UserSubscription,
} from "~/types/store/subscriptionsStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import dayjs from "dayjs";
import SubscriptionList from "../subscriptions/SubscriptionList.vue";

const { containerHeight } = useCalendarDimensions();

const computedHeight = computed(() => {
  if (window.innerWidth < 1024) {
    return "100%";
  }
  return containerHeight.value + "px";
});

const subscriptionStore = useSubscriptionsStore();

defineProps({
  selectedDate: { type: String, default: null },
  subscriptionsCurrentMonth: {
    type: Array as PropType<UserSubscription[]>,
    default: () => [],
  },
});

const handleOpenModalAddSubscription = () => {
  subscriptionStore.setModalDetails(ModalStatus.ADD, null);
  subscriptionStore.openModal();
};

const subscriptionByDay = computed(() => {
  return subscriptionStore.selectedDate
    ? subscriptionStore.getSubscriptionsByDay(
        dayjs(subscriptionStore.selectedDate),
      )
    : null;
});

const currentPage: Ref<number> = ref(1);

// Reset pagination when subscriptions update
watch(subscriptionByDay, (newSubscriptionByDay) => {
  if (newSubscriptionByDay) {
    currentPage.value = 1;
  }
});

function handleClickPagination(page: number) {
  currentPage.value = page;
}

const ITEM_PER_PAGE: number = 5;
const pagination = computed(() => {
  // Max subscription
  const totalItems: number = subscriptionByDay.value
    ? subscriptionByDay.value.length
    : 0;
  const totalPages = Math.ceil(totalItems / ITEM_PER_PAGE);
  const remainingItems = totalItems - ITEM_PER_PAGE * currentPage.value;

  const startIndex =
    currentPage.value === 1 ? 0 : ITEM_PER_PAGE * (currentPage.value - 1);

  const endIndex =
    currentPage.value === totalPages ? totalItems : startIndex + ITEM_PER_PAGE;

  return {
    startIndex,
    endIndex,
    totalItems,
    totalPages,
    remainingItems,
  };
});

function filterSubscriptionByPagination(startIndex: number, endIndex: number) {
  return subscriptionByDay.value?.slice(startIndex, endIndex) ?? [];
}
</script>

<template>
  <div
    v-if="selectedDate && subscriptionsCurrentMonth"
    id="subscription-details"
    class="mb-2 flex w-full flex-col gap-4 rounded-xl bg-secondary p-4 align-middle text-base shadow-custom sm:mb-0 lg:w-[16rem]"
    :style="{
      maxHeight: computedHeight,
      opacity: subscriptionStore.isModalOpen ? 0.2 : 1,
    }"
  >
    <!-- Title -->
    <h1 class="m-1 text-center font-bold">
      {{ $t("subscriptionDetails.title") }}
    </h1>
    <div
      v-if="subscriptionByDay && subscriptionByDay.length > 0"
      class="relative flex flex-col gap-2"
    >
      <!-- LIST OF SUBSCRIPTION -->
      <SubscriptionList
        :subscription-by-day="
          filterSubscriptionByPagination(
            pagination.startIndex,
            pagination.endIndex,
          )
        "
      />
    </div>
    <div v-else>
      <p class="m-1">{{ $t("subscriptionDetails.emptyCharges") }}</p>
    </div>
    <!-- CTA -->
    <div class="sticky mt-auto flex flex-col justify-center gap-4">
      <!-- Pagination -->
      <span class="flex justify-center gap-1 text-xs">
        <button
          v-for="(page, index) in pagination.totalPages"
          :key="index + 1"
          class="w-6 rounded-lg border-2 p-1"
          :class="{
            'border-green-400': currentPage === index + 1,
            'border-white': currentPage !== index + 1,
          }"
          @click="handleClickPagination(index + 1)"
        >
          {{ index + 1 }}
        </button>
      </span>

      <!-- Add subscription button -->
      <button
        class="btn-secondary w-full rounded-lg p-2 text-sm text-light"
        @click="handleOpenModalAddSubscription"
      >
        <p class="text-center font-bold">
          {{ $t("subscriptionDetails.addSubscription") }}
        </p>
      </button>
    </div>
  </div>
</template>

<script lang="css" scoped></script>
