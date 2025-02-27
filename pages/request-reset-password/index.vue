<template>
  <NuxtLayout :name="layout">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-40 flex justify-center bg-black bg-opacity-65 align-middle"
    >
      <NuxtImg
        class="m-auto align-middle text-gray-300"
        src="icons/fade-stagger-circles.svg"
        width="24"
        height="24"
        alt="spinner"
      />
    </div>
    <h1 class="text-center text-primary">
      Veuillez saisir votre adresse e-mail pour recevoir un lien de réinitialisation de
      mot de passe.
    </h1>
    <FormsFormComponent
      label="Envoyer"
      :schema="formResetSchema"
      :is-disabled="isLoading"
      @submit-form="handleRequestResetPassword"
    />

    <a
      class="block cursor-pointer text-center text-green-400 underline underline-offset-4"
      @click="() => navigateTo('login')"
      >Retour à la page de connexion</a
    >
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { requestNewPasswordSchema, type RegisterValues } from "~/schema/reset";
import type {
  ApiResponseResetEmail,
} from "~/types/store/userStore";

definePageMeta({
  layout: "login",
  auth: false,
  path: "/request-reset-password",
});
const layout = "auth-forms";
const formResetSchema = {
  fields: [
    {
      name: "email",
      label: "Email",
      as: "input",
      placeholder: "E-mail",
      rules: requestNewPasswordSchema.fields.email,
    },
  ],
};
const isLoading = ref(false);
async function handleRequestResetPassword(values: RegisterValues) {
  if (!values.email) return;
  isLoading.value = true;
  try {
    const response = await useAPI<ApiResponseResetEmail>(
      "/users/request-reset-password",
      {
        method: "POST",
        body: values,
      },
    );
    if (response && response.statusCode === 200) {
      useNuxtApp().$toast.info(
        "Si votre email est enregistré, vous recevrez un lien de réinitialisation.",
      );
    }
  } catch (error) {
    console.error(error);
    useNuxtApp().$toast.error("Something went wrong");
  } finally {
    isLoading.value = false;
  }
}
</script>
