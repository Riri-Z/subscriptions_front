<script lang="ts" setup>
import BadgeIcon from "./BadgeIcon.vue";

const props = defineProps<{
  name: string;
  index: number;
  icon_url: string | null;
  translateValue: string;
  isComputed: boolean;
}>();

const randomColor = computed(() => {
  if (props.icon_url) return "#ffffff";
  else {
    return letterColorMap[props.name?.toLowerCase()[0]]
      ? letterColorMap[props.name?.toLowerCase()[0]]
      : "#96a240";
  }
});

const badgeValue = computed(() => {
  if (props.isComputed) {
    return `${props.name?.[0].toUpperCase()}+`;
  }
  return props.name?.[0].toUpperCase();
});
</script>

<template>
  <span
    class="absolute flex h-4 w-4 transform flex-row justify-center rounded-full align-middle text-xs lg:h-5 lg:w-5"
    :style="{
      zIndex: props.index,
      transform: props.translateValue,
      backgroundColor: randomColor,
    }"
  >
    <BadgeIcon
      v-if="props.icon_url"
      :name="props.name"
      :icon_url="props.icon_url"
    >
    </BadgeIcon>
    <p v-else>
      {{ badgeValue }}
    </p>
  </span>
</template>
