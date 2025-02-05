<template>
  <button
    class="mt-5 h-10 w-full rounded-md bg-dark-green-color text-white disabled:bg-gray-400"
    type="submit"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
defineProps({
  label: { type: String, default: "" },
  disabled: Boolean,
});
</script>
