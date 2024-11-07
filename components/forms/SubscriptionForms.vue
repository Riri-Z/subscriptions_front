<script lang="ts" setup>
import { useField, useForm, ErrorMessage } from "vee-validate";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import * as yup from "yup";
import { BillingCycle } from "~/types/store/subscriptionsStore";

const validationSchema = yup.object({
  name: yup.string().required(),
  amount: yup.number().required().typeError("Doit être un nombre"),
  startDate: yup.string().required(),
  endDate: yup.string(),
  cycle: yup.mixed<BillingCycle>().oneOf(Object.values(BillingCycle)),
});

const { errors, handleSubmit, defineField } = useForm({
  validationSchema,
});

const subscriptionStore = useSubscriptionsStore();
/* TODO : use library  to validate forms eg : formik */
const formData = ref({
  name: "",
  amount: null,
  startDate: subscriptionStore.selectedDate ?? "",
  endDate: "",
  cycle: "",
});

/* const { value: amount } = useField('amount');
const { value: startDate } = useField('startDate');
const { value: endDate } = useField('endDate');
const { value: cycle } = useField('cycle'); */

const [amount, amountAttrs] = defineField("amount");
const [name, nameAttrs] = defineField("name");
const [startDate, startDateAttrs] = defineField("startDate");
const [endDate, endDateAttrs] = defineField("endDate");
const [cycle, cycleAttrs] = defineField("cycle");

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>
<!-- @submit="$emit('postSubscription', formData)" -->

<template>
  <form class="flex flex-col gap-2 p-2" @submit="onSubmit">
    <!-- subscriptionName -->
    <label class="block text-sm font-bold text-primary-white-color" for="name"
      >Nom<span class="text-red-500"> *</span></label
    >
    <input
      id="name"
      v-model="name"
      class="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      name="name"
      v-bind="nameAttrs"
    />
    <span class="text-xs text-red-400">{{ errors.name }}</span>

    <!-- amount  -->
    <label class="font-bold text-primary-white-color" for="amount"
      >Montant<span class="text-red-500"> *</span></label
    >
    <input
      id="amount"
      v-model="amount"
      class="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      type="number"
      name="amount"
      v-bind="amountAttrs"
    />
    <span class="text-xs text-red-400">{{ errors.amount }}</span>

    <!--  startDate-->

    <label class="font-bold text-primary-white-color" for="startDate"
      >Date de début<span class="text-red-500"> *</span></label
    >
    <input
      id="startDate"
      v-model="startDate"
      type="date"
      class="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      name="startDate"
      v-bind="startDateAttrs"
    />
    <span class="text-xs text-red-400">{{ errors.startDate }}</span>
    <!-- endDate -->
    <label class="font-bold text-primary-white-color" for="endDate"
      >Date de fin
    </label>
    <input
      id="endDate"
      v-model="endDate"
      type="date"
      class="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      name="endDate"
      v-bind="endDateAttrs"
    />
    <span class="text-xs text-red-400">{{ errors.endDate }}</span>

    <!--billingCycle  -->
    <label class="font-bold text-primary-white-color" for="cycle"
      >Cycle<span class="text-red-500"> *</span></label
    >
    <select
      id="cycle"
      v-model="cycle"
      class="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      name="cycle"
      v-bind="cycleAttrs"
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
