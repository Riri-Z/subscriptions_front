<script setup lang="ts">
import { required, minLength, helpers } from "@vuelidate/validators";

import { useVuelidate } from "@vuelidate/core";
import { useAuthStore } from "~/store/authStore";

definePageMeta({
  layout: "connexion",
});
const layout = "auth-forms";

const authStore = useAuthStore();
const formData = reactive({
  username: "",
  password: "",
});

async function redirectToRegisterPage() {
  await navigateTo("/register");
}

const rules = computed(() => {
  return {
    username: {
      required: helpers.withMessage("Un username est requis", required),
    },
    password: {
      required: helpers.withMessage("Le mot de passe est requis", required),
      minLength: helpers.withMessage(
        "Le mot de passe doit être composé de 6 caractères minimum",
        minLength(6),
      ),
    },
  };
});
const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  v$.value.$validate();

  if (!v$.value.$error) {
    await authStore.loginUser(formData.username, formData.password);
  }
};
</script>

<template>
  <NuxtLayout :name="layout">
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
    <form class="flex flex-col gap-3" @submit.prevent="submitForm">
      <label class="block text-sm font-medium text-gray-700" for="username"
        >Nom d'utilisateur</label
      >
      <input
        id="username"
        v-model="formData.username"
        class="autofill-bg w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        :class="{
          'border-2 border-red-500 focus:border-red-500': v$.username.$error,
          'border-2 border-green-300 focus:border-green-300':
            !v$.username.$invalid,
        }"
        type="text"
        placeholder="Entrez votre nom d'utilisateur"
        required
        @change="v$.username.$touch"
      />
      <label class="block text-sm font-medium text-gray-700" for="password"
        >Mot de passe</label
      >
      <div class="flex flex-col">
        <input
          id="password"
          v-model="formData.password"
          class="autofill-bg w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          :class="{
            'border-2 border-red-500 focus:border-red-500': v$.password.$error,
            'border-2 border-green-300 focus:border-green-300':
              !v$.password.$invalid,
          }"
          type="password"
          placeholder="Entrez votre mot de passe"
          required
          @change="v$.password.$touch"
        />
        <div class="my-1 h-5">
          <span
            v-if="v$.password.$error"
            class="relative line-clamp-1 text-xs text-red-500"
            >{{ v$.password.$errors[0].$message }}</span
          >
        </div>
      </div>
      <a href="#" class="text-purple-600 hover:underline"
        >Mot de passe oublié ?</a
      >

      <button
        class="h-10 rounded-md bg-button-color hover:shadow-box-shadow-color disabled:bg-slate-500 disabled:shadow"
        type="submit"
        :disabled="v$.$invalid"
      >
        Connexion
      </button>
    </form>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
/* overrie the default autofill style */
.autofill-bg:-webkit-autofill {
  -webkit-text-fill-color: white !important;
  box-shadow: inset 0 0 0 1000px #9370db !important;
}
</style>
