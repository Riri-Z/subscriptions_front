<script setup lang="ts">
import FormInput from "~/components/forms/FormInput.vue";
import AuthForms from "~/components/forms/AuthForms.vue";
import type { FormData } from "~/types/forms/connexion";

const { signIn } = useAuth();

const layout = "auth-forms";
definePageMeta({
  layout: "login",
});

async function redirectToRegisterPage() {
  await navigateTo("/register");
}

const formData: FormData = reactive({
  username: {
    id: "username",
    label: "Nom d'utilisateur",
    type: "text",
    isError: false,
    required: true,
    placeHolder: "Nom d'utilisateur",
    errorMessage: `Le nom d'utilisateur doit être de 4 charactères minimum`,
    minLength: 4,
    value: "",
  },
  password: {
    id: "password",
    label: "Mot de passe",
    type: "password",
    isError: false,
    required: true,
    placeHolder: "Mot de passe",
    errorMessage: `Le mot de passe doit être de 6 charactères minimum`,
    minLength: 6,
    value: "",
  },
});
// check if  a field should be in error state
watchEffect(() => {
  for (const item in formData) {
    const { isError } = useValidationFormInput();
    formData[item].isError = isError(
      formData[item].value,
      formData[item].minLength,
    );
  }
});

const isFormValid = computed(() => {
  return Object.values(formData).some(
    (field) => field.required && field.value.length < field.minLength,
  );
});

const loading = ref(false);
const errorLogin = ref(false);
async function handleLogin() {
  loading.value = true;
  try {
    const credentials = {
      username: formData.username.value,
      password: formData.password.value,
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
    <AuthForms
      submit-label="Se connecter"
      :disabled="isFormValid"
      :error-login="errorLogin"
      :loading="loading"
      @submit="handleLogin"
    >
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
      <div
        v-for="input in formData"
        :key="input.id"
        class="my-4 flex flex-col gap-5"
      >
        <FormInput
          :id="input.id"
          :label="input.label"
          :type="input.type"
          :place-holder="input.placeHolder"
          :required="input.required"
          :is-error="input.isError"
          :condition="input.errorMessage"
          :model-value="input.value"
          @input="input.value = $event.target.value"
        />
      </div>
    </AuthForms>
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
