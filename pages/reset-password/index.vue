<template>
  <NuxtLayout :name="layout">
    <h1 class="text-center text-primary">
      Création de votre nouveau mot de passe
    </h1>

    <FormsFormComponent
      label="Valider mon mot de passe"
      :schema="formNewPassword"
      :disabled="isLoading"
      @submit-form="handleSubmitNewPassword"
    />
    <a
      class="block cursor-pointer text-center text-green-400 underline underline-offset-4"
      @click="() => navigateTo('login')"
      >Retour à la page de connexion</a
    >
  </NuxtLayout>
</template>

<script lang="ts" setup>
import {
  defineNewPasswordSchema,
  type RegisterValuesNewPassword,
} from "~/schema/reset";
import type { CustomError } from "~/types/error/error";
import type { ApiResponseResetEmail } from "~/types/store/userStore";

const route = useRoute();
const token = route?.query?.token;
const isLoading = ref(false);

definePageMeta({
  layout: "login",
  auth: false,
  path: "/reset-password",
});
const layout = "auth-forms";

const formNewPassword = {
  fields: [
    {
      name: "password",
      label: "Nouveau mot de passe",
      as: "input",
      type: "password",
      placeholder: "Mot de passe",
      rules: defineNewPasswordSchema.fields.password,
    },
    {
      name: "confirmPassword",
      label: "Confirmation du mot de passe",
      as: "input",
      type: "password",
      placeholder: "Mot de passe",
      rules: defineNewPasswordSchema.fields.confirmPassword,
    },
  ],
};

async function handleSubmitNewPassword(values: RegisterValuesNewPassword) {
  const { password, confirmPassword } = values;
  if (!password || !confirmPassword) {
    return useNuxtApp().$toast.error("Mot de passe manquant");
  }

  if (password !== confirmPassword) {
    return useNuxtApp().$toast.error(
      "Les deux mots de passe doivent être identiques",
    );
  }
  return handlePostNewPassword(values.password);
}
onMounted(async () => {
  if (!token) {
    useNuxtApp().$toast.error("Lien de réinitialisation invalide ou expiré");
    navigateTo("login");
  }
});
async function handlePostNewPassword(newPassword: string) {
  if (!newPassword) return;
  isLoading.value = true;

  try {
    const response = await useAPI<ApiResponseResetEmail>(
      "/users/reset-password?token=" + token,
      {
        method: "POST",
        body: { newPassword },
      },
    );

    if (response && response.statusCode === 200) {
      useNuxtApp().$toast.success(
        "Votre mot de passe a été réinitialisé avec succès. Vous allez être redirigé vers la page de connexion",
      );
      // Rediriger vers la page de connexion après un court délai
      setTimeout(() => {
        navigateTo("login");
      }, 1500);
    }
  } catch (error) {
    if (error && typeof error === "object" && "statusCode" in error) {
      const apiError = error as CustomError;

      if (apiError.statusCode === 401) {
        return useNuxtApp().$toast.error(
          "Le lien de réinitialisation n'est plus valide. Veuillez faire une nouvelle demande.",
        );
      }
      console.error("error", error);
      useNuxtApp().$toast.error("Une erreur est survenue");
    }
  } finally {
    isLoading.value = false;
  }
}
</script>
