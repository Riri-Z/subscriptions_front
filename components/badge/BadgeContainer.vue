<template>
  <div class="relative w-full bg-red-500">
    <BadgeSubscription
      v-for="(subscription, index) in subscriptionArray"
      :key="subscription.id"
      :name="subscription.subscription.name"
      :icon-url="subscription.subscription.icon_url"
      :index="index"
      :translate-value="getTranslateValue(index)"
      :is-computed="subscription?.computed ?? false"
    />
  </div>
</template>

<script lang="ts" setup>
import type { UserSubscription } from "~/types/store/subscriptionsStore";

const props = defineProps<{
  activeSubscription: UserSubscription[];
}>();

const windowSize = ref(window.innerWidth);

function computeLastElementOfArraySubscription(
  nbr_max_icons: number,
  nbrSubscription: number,
  activeSubscription: UserSubscription[],
) {
  const visibleSubscriptions = activeSubscription.slice(0, nbr_max_icons - 1);

  const remainingSubscriptions = nbrSubscription - visibleSubscriptions.length;
  const computeId =
    activeSubscription.length > 0
      ? activeSubscription.reduce((a, b) => (a > b ? a : b)).id + 1
      : 1;
  // Compute the name wich will be display in the badge
  const newElement = {
    id: computeId,
    subscription: { name: `${remainingSubscriptions}`, icon_url: null },
    computed: true, //This flag allow to children of component to display special badge
  };

  return [...visibleSubscriptions, newElement];
}
/**
 * Compute new array of subscription based on windowSize
 */
const subscriptionArray = computed(() => {
  const subscription = props.activeSubscription;
  const MAX_ICONS = getMaxIconsBasedOnWidth(windowSize.value);

  if (subscription.length > MAX_ICONS) {
    return computeLastElementOfArraySubscription(
      MAX_ICONS,
      subscription.length,
      subscription,
    );
  } else {
    return subscription;
  }
});

// Compute translate value based on window size
const getTranslateValue = (index: number) => {
  return `translateX(${getTranslationFactor(windowSize.value) * index}px)`;
};

/*
 * Compute  max icon displayed on badge container
 * Maximum displayed icon is 4
 */
function getMaxIconsBasedOnWidth(width: number): number {
  if (width > 480) return 3;
  return 2;
}

const getTranslationFactor = (size: number) => {
  if (size > 1024) return 15;
  if (size > 1000) return 15;
  if (size > 768) return 10;
  if (size > 480) return 10;
  return 13;
};
</script>
57
