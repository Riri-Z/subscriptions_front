<script setup lang="ts">
import { required, minLength, helpers } from "@vuelidate/validators";

import { useVuelidate } from "@vuelidate/core";
import { useAuthStore } from "~/store/authStore";

definePageMeta({
  layout: "connexion",
});

const authStore = useAuthStore();
const formData = reactive({
  username: "",
  password: "",
});

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
  <div class="m-auto flex flex-col gap-2 md:w-[380px]">
    <h1 class="mb-3 text-center text-4xl">Bienvenue</h1>
    <p class="mb-4 text-center">
      Connectez-vous pour continuer ou
      <span class="cursor-pointer underline underline-offset-4">
        inscrivez-vous ici
      </span>
    </p>
    <form
      class="w-100 flex max-w-[400px] flex-col gap-6"
      @submit.prevent="submitForm"
    >
      <label class="pl-1 text-base font-medium leading-5" for="username"
        >Nom d'utilisateur</label
      >
      <input
        id="username"
        v-model="formData.username"
        class="autofill-bg border-1 h-10 w-full rounded-md border-gray-300 bg-button-color px-3 py-2 text-sm text-primary-white-color placeholder-white outline-none autofill:bg-button-color focus:border-button-color focus:shadow-box-shadow-color"
        :class="{
          'border-2 border-red-500 focus:border-red-500': v$.username.$error,
          'border-2 border-green-300 focus:border-green-300':
            !v$.username.$invalid,
        }"
        type="text"
        placeholder="Entrez votre nom d'utilisateur e.g. Sauron"
        required
        @change="v$.username.$touch"
      />
      <label class="pl-1 text-base font-medium leading-5" for="password"
        >Mot de passe</label
      >
      <div class="flex flex-col">
        <input
          id="password"
          v-model="formData.password"
          class="autofill-bg border-1 h-10 w-full rounded-md border-gray-300 bg-button-color px-3 py-2 text-sm text-primary-white-color placeholder-white outline-none autofill:bg-button-color focus:border-button-color focus:shadow-box-shadow-color"
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
        <div class="mt-1 h-5">
          <span
            v-if="v$.password.$error"
            class="relative text-xs text-red-500"
            >{{ v$.password.$errors[0].$message }}</span
          >
        </div>
      </div>
      <a href="#" class="cursor-pointer underline underline-offset-4"
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
  </div>
</template>

<style lang="scss" scoped>
/* overrie the default autofill style */
.autofill-bg:-webkit-autofill {
  -webkit-text-fill-color: white !important;
  box-shadow: inset 0 0 0 1000px #9370db !important;
}
</style>
