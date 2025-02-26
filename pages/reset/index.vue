<template>
  <NuxtLayout :name="layout">
    <h1 class="text-center text-primary">
      Veuillez saisir votre adresse e-mail pour recevoir un lien de réinitialisation de
      mot de passe.
    </h1>
    <FormsFormComponent
      label="Envoyer"
      :schema="formResetSchema"
      @submit-form="handleResetPassword"
    />
    <a
      class="block cursor-pointer text-center text-green-400 underline underline-offset-4"
      @click="() => navigateTo('login')"
      >Retour à la page de connexion</a
    >
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { resetPasswordSchema, type RegisterValues } from "~/schema/reset";
import type { ApiResponse, ApiResponseResetEmail } from "~/types/store/userStore";
/* import type { ApiResponse } from "~/types/store/subscriptionsStore";
 */
definePageMeta({
  layout: "login",
  auth: false,
  path: '/reset-password'

});
const layout = "auth-forms";
const formResetSchema = {
  fields: [
    {
      name: "email",
      label: "Email",
      as: "input",
      placeholder: "E-mail",
      rules: resetPasswordSchema.fields.email,
    },
  ],
};


async function handleResetPassword(values: RegisterValues) {
  if (!values.email) return;
  try {
    const response = useAPI<ApiResponseResetEmail>("/users/request-reset-password", {
      method: "POST",
      body: values,
    });
    if (response && (await response).statusCode === 200 ) {
      useNuxtApp().$toast.info((await response).body.message);
    }
  } catch (error) {
    console.error(error)
    useNuxtApp().$toast.error("Something went wrong");
  }
  console.log("reset submit ", values);
}
</script>
