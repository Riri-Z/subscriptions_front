<template>
  <NuxtLayout :name="layout">
    <h1 class="mb-1 text-center text-xl sm:mb-3 sm:text-4xl">Inscrivez-vous</h1>
    <p class="mb-1 text-center text-xs font-semibold sm:mb-3 sm:text-sm">
      Remplissez le formulaire ci-dessous pour vous inscrire
    </p>
    <AuthForms
      @submit="handleSubmitRegister"
      submit-label="S'inscrire"
      :disabled="isFormValid"
    >
      <div class="my-3" v-for="input in formData">
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
        >
        </FormInput>
      </div>
    </AuthForms>

    <p class="text-center">
      Déjà inscrit ?
      <a
        @click="redirectTologinPage"
        class="cursor-pointer text-purple-600 hover:underline"
        >Connectez-vous</a
      >
    </p>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import AuthForms from "~/components/AuthForms.vue";
import { useAuthStore } from "~/store/authStore";
import type { FormDataRegister } from "~/types/forms/connexion";

definePageMeta({
  layout: "login",
});
const layout = "auth-forms";

const authStore = useAuthStore();

async function redirectTologinPage() {
  await navigateTo("/login");
}

const isFormValid = computed(() => {
  return Object.values(formData).some(
    (field) => field.required && field.value.length < field.minLength,
  );
});

const formData: FormDataRegister = reactive({
  name: {
    id: "name",
    label: "Nom",
    type: "text",
    isError: false,
    required: true,
    placeHolder: "Nom",
    errorMessage: `Le nom doit être de 4 charactères minimum`,
    minLength: 4,
    value: "",
  },
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
  email: {
    id: "email",
    label: "Email",
    type: "text",
    isError: false,
    required: true,
    placeHolder: "Email",
    errorMessage: `L'email doit être de 4 charactères minimum`,
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

watchEffect(() => {
  for (const item in formData) {
    const { isError } = useValidationFormInput();
    formData[item].isError = isError(
      formData[item].value,
      formData[item].minLength,
    );
  }
});
const handleSubmitRegister = async () => {
  const cdt = false;
  if (cdt) {
    await authStore.registerUser(
      formData.email.value,
      formData.username.value,
      formData.name.value,
      formData.password.value,
    );
  }
};
</script>
