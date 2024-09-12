<script setup lang="ts">
definePageMeta({
  layout: 'connexion',
});

const email = ref('');
const password = ref('');
</script>

<template>
  <div class="m-auto flex flex-col gap-2">
    <h1 class="mb-3 text-center text-4xl">Bienvenue</h1>
    <p class="mb-4 text-center">
      Connectez-vous pour continuer ou
      <span class="cursor-pointer underline underline-offset-4">
        inscrivez-vous ici
      </span>
    </p>
    <form class="w-100 flex max-w-[400px] flex-col gap-6" @submit.prevent>
      <label class="pl-1 text-base font-medium leading-5" for="email"
        >Email</label
      >
      <input
        class="border-1 h-10 w-full rounded-md border-gray-300 bg-button-color px-3 py-2 text-sm text-primary-white-color placeholder-white outline-none focus:border-button-color focus:shadow-box-shadow-color"
        v-model="email"
        type="email"
        id="email"
        formControlName="email"
        placeholder="Entrez votre email"
      />
      <label class="pl-1 text-base font-medium leading-5" for="password"
        >Mot de passe</label
      >
      <input
        class="border-1 h-10 w-full rounded-md border-gray-300 bg-button-color px-3 py-2 text-sm text-primary-white-color placeholder-white outline-none focus:border-button-color focus:shadow-box-shadow-color"
        v-model="password"
        type="password"
        id="password"
        formControlName="password"
        placeholder="Entrez votre mot de passe"
      />
      <a href="#" class="cursor-pointer underline underline-offset-4"
        >Mot de passe oublié ?</a
      >
      <button
        class="h-10 rounded-md bg-button-color hover:shadow-box-shadow-color"
        type="submit"
      >
        Continuer
      </button>
    </form>
  </div>
</template>
