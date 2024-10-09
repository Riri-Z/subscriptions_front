<template>
  <form @submit.prevent="$emit('submit')">
    <slot />
    <p v-if="errorLogin" class="text-red-800">
      <!-- TODO : RESET PASSWORD -->
      Identifiants incorrects ! Rénitialisation du mots de passe prochainement
      ;)
    </p>
    <SubmitForm :label="submitLabel" :disabled="disabled" />
  </form>
</template>

<script lang="ts" setup>
import SubmitForm from "./SubmitForm.vue";

defineProps<{
  submitLabel: string;
  disabled: boolean;
  errorLogin: boolean;
}>();

defineEmits(["submit"]);
</script>
