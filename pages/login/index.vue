<script setup lang="ts">
import { useAuthStore } from "~/store/authStore";
const authStore = useAuthStore();

const layout = "auth-forms";
definePageMeta({
  layout: "login",
});

interface FormField {
  id: string;
  label: string;
  type: string;
  isError: boolean;
  required: boolean;
  placeHolder: string;
  errorMessage: string;
  minLength: number;
  value: string;
}

interface FormData {
  username: FormField;
  password: FormField;
  [key: string]: FormField;
}

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
    type: "text",
    isError: false,
    required: true,
    placeHolder: "Mot de passe",
    errorMessage: `Le mot de passe doit être de 6 charactères minimum`,
    minLength: 6,
    value: "",
  },
});

watch(
  () => formData.password.value,
  (value) => {
    const { isError } = useValidationFormInput();
    formData.password.isError = isError(value, formData.password.minLength);
  },
);
watch(
  () => formData.username.value,
  (value) => {
    const { isError } = useValidationFormInput();
    formData.username.isError = isError(value, formData.username.minLength);
  },
);

const isFormValid = computed(() => {
  return Object.values(formData).some(
    (field) => field.required && field.value.length < field.minLength,
  );
});

async function handleLogin() {
  try {
    await authStore.loginUser(formData.username.id, formData.password.id);
  } catch (error) {
    console.error("error handleLogin", error);
  }
}
</script>
<template>
  <NuxtLayout :name="layout">
    <AuthForms
      @submit="handleLogin"
      submit-label="Se connecter"
      :disabled="isFormValid"
    >
      <h1 class="mb-3 text-center text-4xl">Bienvenue</h1>
      <p class="mb-4 text-center">
        Connectez-vous pour continuer ou
        <a
          @click="redirectToRegisterPage"
          class="cursor-pointer text-purple-600 hover:underline"
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
          :placeHolder="input.placeHolder"
          :required="input.required"
          :is-error="input.isError"
          :condition="input.errorMessage"
          :modelValue="input.value"
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
