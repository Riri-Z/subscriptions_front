<template>
  <div
    class="absolute left-1/2 top-1/2 z-[50] h-fit w-fit translate-x-[-50%] translate-y-[-50%] rounded-md bg-deep-green-color text-white"
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
          class="mr-5 h-10 w-[8rem] rounded-lg bg-soft-green-color text-white disabled:bg-slate-300"
          @click="emit('deleteSubscription', props.subscription)"
        >
          <p>Continuer</p>
        </button>
        <button
          class="mr-5 h-10 w-[8rem] rounded-lg bg-soft-green-color text-white"
          @click="emit('cancelAction')"
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

const emit = defineEmits(["deleteSubscription", "cancelAction"]);
</script>
