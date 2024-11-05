<script lang="ts" setup>
const formData = reactive({
  name: "",

  amount: "",
  cycle: "",
});
</script>

<template>
  <form @submit.prevent="console.log(formData)" class="flex flex-col gap-2 p-4">
    <label class="block text-sm font-medium text-gray-700" for="name"
      >Nom<span class="text-red-600">*</span></label
    >
    <input
      class="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      :value="formData.name"
      name="name"
      id="name"
    />

    <label for="amount">Montant</label>
    <input
      class="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      :value="formData.amount"
      name="amount"
      id="amount"
    />

    <label for="cycle">Cycle</label>
    <select
      class="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      name="cycle"
      id="cycle"
    >
      <option value="WEEKLY">Hebdomadaire</option>
      <option value="MONTHLY">Mensuelle</option>
      <option value="YEARLY">Annuelle</option>
    </select>
  </form>
  <!--
  TODO : save on store,  or on submit post new subscription

  -->
</template>
