<script setup lang="ts">
import { registerSchema } from "~/schema/register";
import { loginSchema, type Login } from "~/schema/login";
import FormComponent from "~/components/forms/FormComponent.vue";

const { signIn } = useAuth();

const layout = "auth-forms";
definePageMeta({
  layout: "login",
});

async function redirectToRegisterPage() {
  await navigateTo("/register");
}

const formSchema = {
  fields: [
    {
      name: "username",
      label: "Nom d'utilisateur",
      as: "input",
      placeholder: "Nom d'utilisateur",
      rules: loginSchema.fields.username,
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

async function handleLogin(values: Login) {
  try {
    const credentials = {
      username: values.username,
      password: values.password,
    };
    await signIn(credentials, { callbackUrl: "/dashboard" });
  } catch (error) {
    console.log(error);
    useNuxtApp().$toast.error('Nom d"utilisateur ou mot de passe incorrect.');
  }
}
</script>
<template>
  <NuxtLayout :name="layout">
    <div>
      <h1 class="mb-3 text-center text-4xl">Bienvenue</h1>
      <p class="mb-4 text-center">
        Connectez-vous pour continuer ou
        <a
          class="cursor-pointer text-purple-600 hover:underline"
          @click="redirectToRegisterPage"
        >
          inscrivez-vous ici
        </a>
      </p>
      <FormComponent :schema="formSchema" @submit-form="handleLogin" />
    </div>
  </NuxtLayout>
</template>

/>

<style lang="scss" scoped>
/* overrie the default autofill style */
.autofill-bg:-webkit-autofill {
  -webkit-text-fill-color: white !important;
  box-shadow: inset 0 0 0 1000px #9370db !important;
}
</style>
