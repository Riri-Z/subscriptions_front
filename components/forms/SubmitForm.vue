<template>
  <button
    class="btn my-5 h-10 w-full rounded-lg font-semibold text-light shadow-btn-box-shadow transition disabled:cursor-not-allowed"
    type="submit"
    :disabled="disabled"
  >
    <span class="flex flex-row items-center justify-center gap-4">
      <NuxtImg
        v-if="isLoading"
        class="animate-spin"
        src="icons/loader-circle.svg"
        width="24"
        height="24"
        alt="spinner"
      />

      <p v-else>
        {{ label }}
      </p>
    </span>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  label: { type: String, default: "" },
  disabled: Boolean,
  isLoading: {
    type: Boolean,
    default: true,
  },
});
</script>
