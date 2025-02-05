<template>
  <div
    class="absolute left-[50%] top-[50%] z-[50] h-fit w-fit translate-x-[-50%] translate-y-[-50%] rounded-md bg-gray-600 text-white"
    @keydown.escape="$emit('cancelAction')"
  >
    <div class="m-4 flex flex-col gap-4 align-middle">
      <h1>
        Souhaitez-vous supprimer l'abonnement suivant :
        <p class="text-center font-bold">
          {{ props.label }}
        </p>
      </h1>
      <div class="flex flex-row justify-center">
        <button
          @click="$emit('deleteSubscription', props.subscription)"
          class="bg-green-color mr-5 h-10 w-[8rem] rounded-lg text-white hover:bg-green-600 disabled:bg-slate-300"
        >
          <p>Continuer</p>
        </button>
        <button
          @click="$emit('cancelAction')"
          class="rounded- bg-green-color mr-5 h-10 w-[8rem] rounded-lg text-white hover:bg-green-600 disabled:bg-slate-300"
        >
          <p>Annuler</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UserSubscription } from "~/types/store/subscriptionsStore";

const props = defineProps<{
  label: string;
  subscription: UserSubscription;
}>();
</script>
