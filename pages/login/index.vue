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

const loading = ref(false);
const errorLogin = ref(false);
async function handleLogin(values: Login) {
  loading.value = true;
  try {
    const credentials = {
      username: values.username,
      password: values.password,
    };
    loading.value = false;
    await signIn(credentials, { callbackUrl: "/dashboard" });
  } catch (error) {
    loading.value = false;
    errorLogin.value = true;
    console.error("Erreur lors de la connexion:", error);
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
