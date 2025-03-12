<script lang="ts" setup>
import BadgeIcon from "./BadgeIcon.vue";
import { tooltipMessages } from "~/utils/constants/tooltip-messages";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  name: string;
  amount: number;
  index: number;
  iconUrl: string;
  translateValue: string;
  isComputed: boolean;
}>();

const randomColor = computed(() => {
  if (props.iconUrl) return "#ffffff";
  else {
    return letterColorMap[props.name?.toLowerCase()[0]] ?? "#96a240";
  }
});

const badgeValue = computed(() => {
  if (props.isComputed) {
    return `${props.name?.[0].toUpperCase()}+`;
  }
  return props.name?.[0].toUpperCase();
});
const { t } = useI18n();

const computeTooltipContent = computed(() => {
  if (!props.isComputed) {
    return tooltipMessages.calendar.badge.badgeWithIcons(
      props.name,
      props.amount,
    );
  }
  return t("dashboard.ctaDetails");
});
</script>

<template>
  <CardsTooltip :position="'top'" offset="14" :content="computeTooltipContent">
    <span
      class="z-0 flex h-5 w-5 transform flex-row justify-center rounded-full align-middle text-xs transition-transform duration-300 ease-in-out md:hover:scale-150 lg:h-5 lg:w-5"
      :style="{
        zIndex: props.index,
        marginLeft: translateValue,
        backgroundColor: randomColor,
      }"
    >
      <BadgeIcon :name="badgeValue ?? props.name" :icon-url="props.iconUrl" />
    </span>
  </CardsTooltip>
</template>
