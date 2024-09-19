<template>
  <div class="m-auto flex flex-col gap-2 md:w-[380px]">
    <h1 class="mb-3 text-center text-4xl">Inscrivez-vous</h1>
    <p class="mb-4 text-center">
      Remplissez le formulaire ci-dessous pour vous inscrire
    </p>
    <form class="flex max-w-full flex-col gap-6" @submit.prevent="submitForm">
      <label class="pl-1 text-base font-medium leading-5" for="name">Nom</label>
      <input
        id="name"
        v-model="formData.name"
        class="autofill-bg border-1 h-10 w-full rounded-md border-gray-300 bg-button-color px-3 py-2 text-sm text-primary-white-color placeholder-white outline-none autofill:bg-button-color focus:border-button-color focus:shadow-box-shadow-color"
        :class="{
          'border-2 border-red-500 focus:border-red-500': v$.name.$error,
          'border-2 border-green-300 focus:border-green-300': !v$.name.$invalid,
        }"
        type="text"
        placeholder="Entrez votre nom"
        required
        @change="v$.name.$touch"
      />
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
      <label class="pl-1 text-base font-medium leading-5" for="email"
        >Email</label
      >
      <input
        id="email"
        v-model="formData.email"
        required
        class="autofill-bg border-1 h-10 w-full rounded-md border-gray-300 bg-button-color px-3 py-2 text-sm text-primary-white-color placeholder-white outline-none autofill:bg-button-color focus:border-button-color focus:shadow-box-shadow-color"
        :class="{
          'border-2 border-red-500 focus:border-red-500': v$.email.$error,
          'border-2 border-green-300 focus:border-green-300':
            !v$.email.$invalid,
        }"
        type="text"
        placeholder="Entrez votre email"
        @change="v$.email.$touch"
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

<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { helpers, email, minLength, required } from "@vuelidate/validators";
import { useAuthStore } from "~/store/authStore";

definePageMeta({
  layout: "connexion",
});

const authStore = useAuthStore();

const formData = reactive({
  name: "",
  username: "",
  password: "",
  email: "",
});

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage("Un nom est requis", required),
    },
    username: {
      required: helpers.withMessage("Un username est requis", required),
    },
    email: {
      email,
      required: helpers.withMessage("Un email est requis", required),
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
    await authStore.registerUser(formData);
  }
};
</script>
