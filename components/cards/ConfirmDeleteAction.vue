<template>
  <div
    class="absolute left-[50%] top-[50%] h-fit w-fit translate-x-[-50%] translate-y-[-50%] rounded-md border bg-white text-black"
    @keydown.escape="$emit('cancelAction')"
  >
    <div class="m-4 flex flex-col gap-4 align-middle">
      <h1>
        Souhaitez-vous supprimer l'abonnement suivant :
        <p class="text-center font-bold">
          {{ props.label }}
        </p>
      </h1>
      <div class="flex flex-row">
        <button
          @click="$emit('deleteSubscription', props.subscription)"
          class="border-white-950 mr-5 h-10 w-full rounded-lg border-2 bg-green-color text-white hover:bg-green-600 disabled:bg-slate-300"
        >
          Continuer
        </button>
        <button
          @click="$emit('cancelAction')"
          class="border-white-950 rounded- mr-5 h-10 w-full border-2 bg-green-color text-white hover:bg-green-600 disabled:bg-slate-300"
        >
          Annuler
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
