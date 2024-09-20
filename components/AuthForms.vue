<template>
  <form @submit.prevent="$emit('submit')">
    <slot />
    <SubmitForm :label="submitLabel" :disabled="statusForms" />
  </form>
</template>

<script lang="ts" setup>
import SubmitForm from "./SubmitForm.vue";

defineProps({
  submitLabel: {
    type: String,
    default: "Soumettre",
  },
  statusForms: Boolean,
});

defineEmits(["submit"]);
</script>
