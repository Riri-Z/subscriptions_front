<template>
  <form @submit.prevent="$emit('submit')">
    <slot />
    <SubmitForm :label="submitLabel" :disabled="disabled" />
  </form>
</template>

<script lang="ts" setup>
import SubmitForm from "./SubmitForm.vue";

defineProps<{
  submitLabel: string;
  disabled: boolean;
}>();

defineEmits(["submit"]);
</script>
