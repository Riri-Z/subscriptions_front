<template>
  <NuxtLayout :name="layout">
    <h1 class="mb-1 text-center text-xl sm:mb-3 sm:text-4xl">Inscrivez-vous</h1>
    <p class="mb-1 text-center text-xs font-semibold sm:mb-3 sm:text-sm">
      Remplissez le formulaire ci-dessous pour vous inscrire
    </p>

    <form class="flex flex-col gap-3" @submit.prevent="submitForm">
      <div class="mb-4 flex flex-col gap-2">
        <label class="block text-sm font-medium text-gray-700" for="name"
          >Nom{{ "\u0009" }}
          <span class="text-red-500">*</span>
        </label>
        <input
          id="name"
          v-model="formData.name"
          class="autofill-bg w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          :class="{
            'border-2 border-red-500 focus:border-red-500': v$.name.$error,
            'border-2 border-green-300 focus:border-green-300':
              !v$.name.$invalid,
          }"
          type="text"
          placeholder="Entrez votre nom"
          required
          @change="v$.name.$touch"
        />
      </div>
      <label class="block text-sm font-medium text-gray-700" for="username"
        >Nom d'utilisateur{{ "\u0009"
        }}<span class="text-red-500">*</span></label
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
        placeholder="Entrez votre nom d'utilisateur e.g. Sauron"
        required
        @change="v$.username.$touch"
      />
      <label class="block text-sm font-medium text-gray-700" for="email"
        >Email{{ "\u0009" }}<span class="text-red-500">*</span></label
      >
      <input
        id="email"
        v-model="formData.email"
        required
        class="autofill-bg w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        :class="{
          'border-2 border-red-500 focus:border-red-500': v$.email.$error,
          'border-2 border-green-300 focus:border-green-300':
            !v$.email.$invalid,
        }"
        type="text"
        placeholder="Entrez votre email"
        @change="v$.email.$touch"
      />
      <label class="block text-sm font-medium text-gray-700" for="password"
        >Mot de passe{{ "\u0009" }}<span class="text-red-500">*</span></label
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
        <div class="mt-1 h-5">
          <span
            v-if="v$.password.$error"
            class="relative text-xs text-red-500"
            >{{ v$.password.$errors[0].$message }}</span
          >
        </div>
      </div>
      <button
        class="h-10 rounded-md bg-button-color hover:shadow-box-shadow-color disabled:bg-slate-500 disabled:text-white disabled:shadow"
        type="submit"
        :disabled="v$.$invalid"
      >
        S'inscrire
      </button>
      <p class="text-center">
        Déjà inscrit ?
        <a
          @click="redirectToConnexionPage"
          class="text-purple-600 hover:underline"
          >Connectez-vous</a
        >
      </p>
    </form>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { helpers, email, minLength, required } from "@vuelidate/validators";
import { useAuthStore } from "~/store/authStore";

definePageMeta({
  layout: "connexion",
});
const layout = "auth-forms";

const authStore = useAuthStore();

async function redirectToConnexionPage() {
  await navigateTo("/connexion");
}

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
      minLength: helpers.withMessage(
        "Le nom doit être composé de 1 caractères minimum",
        minLength(1),
      ),
    },
    username: {
      required: helpers.withMessage("Un username est requis", required),
      minLength: helpers.withMessage(
        "Le nom d'utilisateur doit être composé de 1 caractères minimum",
        minLength(1),
      ),
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
