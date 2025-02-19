<template>
  <button
    class="btn my-5 h-10 w-full rounded-lg bg-primary font-semibold text-light shadow-btn-box-shadow transition disabled:cursor-not-allowed disabled:bg-[#82929B]"
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
