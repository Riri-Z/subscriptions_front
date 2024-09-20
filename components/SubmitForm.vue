<template>
  <button
    class="mt-5 h-10 w-full rounded-md bg-button-color hover:shadow-box-shadow-color disabled:bg-slate-500 disabled:shadow"
    type="submit"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
defineProps({
  label: String,
  disabled: Boolean,
});
defineEmits(["submitButton"]);
</script>
