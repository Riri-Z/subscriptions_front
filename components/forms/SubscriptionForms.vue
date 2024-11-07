<script lang="ts" setup>
import { useSubscriptionsStore } from "~/store/subscriptionsStore";

const subscriptionStore = useSubscriptionsStore();
/* TODO : use library  to validate forms eg : formik */
const formData = ref({
  name: "",
  amount: null,
  startDate: subscriptionStore.selectedDate ?? "",
  endDate: "",
  cycle: "",
});
</script>

<template>
  <form
    class="flex flex-col gap-2 p-2"
    @submit.prevent="$emit('postSubscription', formData)"
  >
    <!-- subscriptionName -->
    <label class="block text-sm font-bold text-primary-white-color" for="name"
      >Nom<span class="text-red-500"> *</span></label
    >
    <input
      id="name"
      v-model="formData.name"
      class="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      name="name"
    />
    <!-- amount  -->
    <label class="font-bold text-primary-white-color" for="amount"
      >Montant<span class="text-red-500"> *</span></label
    >
    <input
      id="amount"
      v-model="formData.amount"
      class="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      type="number"
      name="amount"
    />

    <!--  startDate-->

    <label class="font-bold text-primary-white-color" for="startDate"
      >Date de début<span class="text-red-500"> *</span></label
    >
    <input
      id="startDate"
      v-model="formData.startDate"
      type="date"
      class="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      name="startDate"
    />
    <!-- endDate -->
    <label class="font-bold text-primary-white-color" for="endDate"
      >Date de fin
    </label>
    <input
      id="endDate"
      v-model="formData.endDate"
      type="date"
      class="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      name="endDate"
    />
    <!--billingCycle  -->
    <label class="font-bold text-primary-white-color" for="cycle"
      >Cycle<span class="text-red-500"> *</span></label
    >
    <select
      id="cycle"
      v-model="formData.cycle"
      class="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      name="cycle"
    >
      <option value="WEEKLY">Hebdomadaire</option>
      <option value="MONTHLY">Mensuelle</option>
      <option value="YEARLY">Annuelle</option>
    </select>

    <section class="flex">
      <button
        type="submit"
        class="border-white-950 my-5 mr-5 h-10 w-full rounded-md border-2 text-white hover:bg-blue-500 disabled:bg-slate-300 disabled:shadow"
      >
        Sauvegarder
      </button>
      <button
        class="border-white-950 my-5 ml-5 h-10 w-full rounded-md border-2 text-white hover:bg-blue-500 hover:shadow-box-shadow-color disabled:bg-slate-300 disabled:shadow"
        @click="subscriptionStore.closeModal"
      >
        Fermer
      </button>
    </section>
  </form>
</template>
