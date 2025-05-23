<template>
  <div
    class="relative flex"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <slot></slot>

    <span
      v-if="isHovered"
      class="tooltip absolute text-[8px]"
      :style="tooltipPositionStyle"
    >
      {{ props.content }}
    </span>
  </div>
</template>

<script lang="ts" setup>
export type Position = "top" | "left" | "bottom" | "right";
const props = defineProps({
  position: { type: String, default: "bottom" },
  offset: { type: String, default: "8" },
  content: { required: true, type: String },
});

const isHovered = ref(false);

const tooltipPositionStyle = computed(() => {
  switch (props.position) {
    case "top":
      return {
        bottom: `calc(100% + ${props.offset}px)`,
        left: "50%",
        transform: "translateX(-50%)",
      };
    case "right":
      return {
        left: `calc(100% + ${props.offset}px)`,
        top: "0",
        transform: "translateY(-25%)",
      };
    case "top-right":
      return {
        left: `calc(100% + ${props.offset}px)`,
        top: "0",
        transform: "translateY(-75%)",
      };
    case "left":
      return {
        right: `calc(100% + ${props.offset}px)`,
        top: "0",
        transform: "translateY(-25%)",
      };
    case "bottom":
    default:
      return {
        top: `calc(100% + ${props.offset}px)`,
        left: "50%",
        transform: "translateX(-50%)",
      };
  }
});
</script>

<style scoped>
@media (width <= 768px) {
  .tooltip {
    display: none;
  }
}
.tooltip {
  color: black;
  position: absolute;
  text-align: center;
  overflow: visible;
  min-width: 150px;
  line-height: 1rem;
  padding: 8px;
  font-size: 12px;
  font-weight: 600;
  background-color: white;
  border-radius: 10px;
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.8s;
  z-index: 9999;
}
</style>
