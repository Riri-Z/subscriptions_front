<template>
  <NuxtLayout :name="layout">
    <h1 class="mb-1 text-center text-xl sm:mb-3 sm:text-4xl">Inscrivez-vous</h1>
    <p class="mb-1 text-center text-xs font-semibold sm:mb-3 sm:text-sm">
      Remplissez le formulaire pour vous inscrire
    </p>

    <FormComponent :schema="formSchema" @submit-form="handleSaveRegister" />

    <p class="text-center">
      Déjà inscrit ?
      <a
        class="cursor-pointer text-purple-600 hover:underline"
        @click="redirectTologinPage"
        >Connectez-vous</a
      >
    </p>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { registerSchema, type RegisterValues } from "~/schema/register";
import { useAuthStore } from "~/store/authStore";
import FormComponent from "~/components/forms/FormComponent.vue";
import { registerMessages } from "~/utils/constants/toast-status-message";

definePageMeta({
  layout: "login",
  auth: false,
});
const layout = "auth-forms";

const authStore = useAuthStore();

async function redirectTologinPage() {
  await navigateTo("/login");
}

async function handleSaveRegister(values: RegisterValues) {
  const { name, username, password, email } = values;
  try {
    const statusCode: number | undefined = await authStore.registerUser(
      name,
      username,
      password,
      email,
    );

    if (statusCode === 201) {
      useNuxtApp().$toast.success(registerMessages.success);
      setTimeout(() => {
        navigateTo("/login");
      }, 2000);
    }
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "statusCode" in error) {
      const statusCode = (error as { statusCode: number }).statusCode;
      if (statusCode === 409) {
        return useNuxtApp().$toast.error(registerMessages.error);
      }
    } else {
      useNuxtApp().$toast.error(registerMessages.unknownError);
    }
  }
}

const formSchema = {
  fields: [
    {
      name: "name",
      label: "Nom",
      as: "input",
      placeholder: "Nom",
      rules: registerSchema.fields.name,
    },
    {
      name: "username",
      label: "Nom d'utilisateur",
      as: "input",
      placeholder: "Nom d'utilisateur",
      rules: registerSchema.fields.username,
    },
    {
      name: "email",
      label: "Email",
      as: "input",
      placeholder: "E-mail",
      rules: registerSchema.fields.email,
    },
    {
      name: "password",
      label: "Mot de passe",
      as: "input",
      type: "password",
      placeholder: "Mot de passe",
      rules: registerSchema.fields.password,
    },
  ],
};
</script>
