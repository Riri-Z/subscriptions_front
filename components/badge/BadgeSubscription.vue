<script lang="ts" setup>
import BadgeIcon from "./BadgeIcon.vue";

const props = defineProps<{
  name: string;
  index: number;
  iconUrl: string | null;
  translateValue: string;
  isComputed: boolean;
}>();

const randomColor = computed(() => {
  if (props.iconUrl) return "#ffffff";
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
    class="flex h-4 w-4 transform flex-row justify-center rounded-full align-middle text-xs lg:h-5 lg:w-5"
    :style="{
      zIndex: props.index,
      marginLeft: translateValue,
      backgroundColor: randomColor,
    }"
  >
    <BadgeIcon
      v-if="props.iconUrl"
      :name="props.name"
      :icon-url="props.iconUrl"
    />
    <p v-else class="self-center">
      {{ badgeValue }}
    </p>
  </span>
</template>
