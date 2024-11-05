<script lang="ts" setup>
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import SubscriptionForms from "~/components/forms/SubscriptionForms.vue";
const subscriptionStore = useSubscriptionsStore();
</script>

<template>
  <Teleport to="#sidebar" v-if="subscriptionStore.isModalOpen">
    <div
      v-if="subscriptionStore.isModalOpen"
      class="fixed left-[41%] top-[20%] z-[50] flex h-[600px] w-[500px] flex-col justify-evenly rounded-lg bg-purple-500 p-8"
    >
      <h1 class="text-center text-3xl">
        Ajouter un abonnement pour {{ subscriptionStore.selectedDate }}
      </h1>
      <SubscriptionForms />
      <section class="flex">
        <button
          class="my-5 mr-5 h-10 w-full rounded-md bg-button-color text-white hover:bg-blue-500 disabled:bg-slate-300 disabled:shadow"
        >
          Sauvegarder
        </button>
        <button
          class="my-5 ml-5 h-10 w-full rounded-md bg-button-color text-white hover:bg-blue-500 hover:shadow-box-shadow-color disabled:bg-slate-300 disabled:shadow"
          @click="subscriptionStore.closeModal"
        >
          Close
        </button>
      </section>
    </div>
  </Teleport>
</template>
