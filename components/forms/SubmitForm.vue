<template>
  <button
    class="my-5 h-10 w-full rounded-lg bg-primary text-light font-semibold transition disabled:cursor-not-allowed disabled:bg-[#82929B] shadow-btn-box-shadow"
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
