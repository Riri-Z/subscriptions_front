<template>
  <button
    class="mt-5 h-10 w-full rounded-md bg-button-color text-white hover:shadow-box-shadow-color disabled:bg-slate-300 disabled:shadow"
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
