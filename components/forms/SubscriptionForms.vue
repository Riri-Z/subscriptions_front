<script lang="ts" setup>
import { useField, useForm, ErrorMessage } from "vee-validate";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import * as yup from "yup";
import { BillingCycle } from "~/types/store/subscriptionsStore";

const subscriptionStore = useSubscriptionsStore();

const validationSchema = yup.object({
  subscriptionName: yup.string().required("Un nom est requis"),
  amount: yup
    .number()
    .default(0)
    .min(0)
    .max(999)
    .typeError("Doit être un nombre valide")
    .required("Un montant est requis"),
  startDate: yup
    .string()
    .default(subscriptionStore.selectedDate)
    .required("Une date de début est requise"),

  endDate: yup.string(),
  billingCycle: yup.mixed<BillingCycle>().oneOf(Object.values(BillingCycle)),
});

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: validationSchema,
  initialValues: {
    amount: 0,
    subscriptionName: "",
    startDate: subscriptionStore.selectedDate,
    billingCycle: "MONTHLY",
    endDate: "",
  },
});

const [amount, amountAttrs] = defineField("amount");
const [subscriptionName, subscriptionNameAttrs] =
  defineField("subscriptionName");
const [startDate, startDateAttrs] = defineField("startDate");
const [endDate, endDateAttrs] = defineField("endDate");
const [billingCycle, billingCycleAttrs] = defineField("billingCycle");

const emit = defineEmits(["postSubscription"]);

const onSubmit = handleSubmit((values) => {
  emit("postSubscription", values);
});
</script>

<template>
  <h1 class="py-4 text-center text-2xl text-primary-white-color">
    Ajouter un abonnement
  </h1>
  <form class="flex flex-col gap-2 p-2" @submit="onSubmit">
    <!-- subscriptionName -->
    <label
      class="block text-sm font-bold text-primary-white-color"
      for="subscriptionName"
      >Nom<span class="text-red-500"> *</span></label
    >
    <input
      id="subscriptionName"
      v-model="subscriptionName"
      class="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      name="subscriptionName"
      v-bind="subscriptionNameAttrs"
    />
    <span class="text-xs text-red-400">{{ errors.subscriptionName }}</span>

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

    <!--BillingCycle  -->
    <label class="font-bold text-primary-white-color" for="billingCycle"
      >billingCycle<span class="text-red-500"> *</span></label
    >
    <select
      id="billingCycle"
      v-model="billingCycle"
      class="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      name="billingCycle"
      v-bind="billingCycleAttrs"
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
