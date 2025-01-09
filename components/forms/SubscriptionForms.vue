<script lang="ts" setup>
import { useField, useForm, ErrorMessage } from "vee-validate";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import * as yup from "yup";
import dayjs from "dayjs";
import {
  BillingCycle,
  SubscriptionCategory,
} from "~/types/store/subscriptionsStore";

interface CategoryOption {
  value: SubscriptionCategory;
  text: string;
}

const CATEGORIES_OPTIONS: CategoryOption[] = [
  { value: SubscriptionCategory.FOOD, text: "Alimentation" },
  { value: SubscriptionCategory.HEALTH, text: "Santé" },
  { value: SubscriptionCategory.SPORT, text: "Sport" },
  { value: SubscriptionCategory.FINANCE, text: "Finance" },
  { value: SubscriptionCategory.LEISURE, text: "Loisir" },
  { value: SubscriptionCategory.OTHER, text: "Autre" },
];

const subscriptionStore = useSubscriptionsStore();

const validationSchema = yup.object({
  subscriptionName: yup.string().required("Un nom est requis"),
  amount: yup
    .number()
    .default(0)
    .min(0)
    .max(999999)
    .typeError("Doit être un nombre valide")
    .required("Un montant est requis"),
  startDate: yup
    .string()
    .default(subscriptionStore.selectedDate)
    .required("Une date de début est requise"),

  endDate: yup.string(),
  billingCycle: yup.mixed<BillingCycle>().oneOf(Object.values(BillingCycle)),
  subscriptionCategory: yup
    .mixed<SubscriptionCategory>()
    .oneOf(Object.values(SubscriptionCategory)),
});

const defaultSubscriptionFormValue = computed(() => {
  if (subscriptionStore && subscriptionStore?.selectedSubscription) {
    return {
      amount: subscriptionStore.selectedSubscription.amount,
      subscriptionName:
        subscriptionStore.selectedSubscription.subscription.name,
      startDate: subscriptionStore.selectedSubscription.startDate
        ? dayjs(subscriptionStore.selectedSubscription.startDate).format(
            "YYYY-MM-DD",
          )
        : "",
      endDate: subscriptionStore.selectedSubscription.endDate
        ? dayjs(subscriptionStore.selectedSubscription.endDate).format(
            "YYYY-MM-DD",
          )
        : "",
      billingCycle: subscriptionStore.selectedSubscription.billingCycle,
      subscriptionCategory:
        subscriptionStore.selectedSubscription.subscription.category,
    };
  } else {
    return {
      amount: 0,
      subscriptionName: "",
      startDate: subscriptionStore.selectedDate || "",
      endDate: "",
      billingCycle: BillingCycle.MONTHLY,
      subscriptionCategory: SubscriptionCategory.OTHER,
    };
  }
});

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: validationSchema,
  initialValues: defaultSubscriptionFormValue.value,
});

const [amount, amountAttrs] = defineField("amount");
const [subscriptionName, subscriptionNameAttrs] =
  defineField("subscriptionName");
const [startDate, startDateAttrs] = defineField("startDate");
const [endDate, endDateAttrs] = defineField("endDate");
const [billingCycle, billingCycleAttrs] = defineField("billingCycle");
const [subscriptionCategory, subscriptionCategoryAttrs] = defineField(
  "subscriptionCategory",
);

const emit = defineEmits(["postSubscription"]);

const onSubmit = handleSubmit((values) => {
  emit("postSubscription", values);
});

function handleCancelSubscription() {
  subscriptionStore.setSelectedSubscription(null);
  subscriptionStore.closeModal();
}
</script>

<template>
  <h1 class="text-primary-black-color py-1 text-center text-2xl md:py-2">
    {{
      subscriptionStore.selectedSubscription
        ? "Editer l'abonnement"
        : "Ajouter un abonnement"
    }}
  </h1>
  <form class="flex flex-col gap-2 p-2">
    <!-- subscriptionName -->
    <label
      class="text-primary-black-color block text-sm font-bold"
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
    <label class="text-primary-black-color font-bold" for="amount"
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

    <label class="text-primary-black-color font-bold" for="startDate"
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
    <label class="text-primary-black-color font-bold" for="endDate"
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
    <label class="text-primary-black-color font-bold" for="billingCycle"
      >Cycle de paiement<span class="text-red-500"> *</span></label
    >
    <select
      id="billingCycle"
      v-model="billingCycle"
      class="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      name="billingCycle"
      v-bind="billingCycleAttrs"
    >
      <option value="WEEKLY">Hebdomadaire</option>
      <option value="MONTHLY">Mensuel</option>
      <option value="YEARLY">Annuel</option>
    </select>
    <!-- Category  -->
    <label class="text-primary-black-color font-bold" for="subscriptionCategory"
      >Catégorie<span class="text-red-500"> *</span></label
    >
    <select
      id="subscriptionCategory"
      v-model="subscriptionCategory"
      class="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      name="billingCycle"
      v-bind="subscriptionCategoryAttrs"
    >
      <option
        v-for="subscriptionCategory in CATEGORIES_OPTIONS"
        :value="subscriptionCategory?.value"
      >
        {{ subscriptionCategory.text }}
      </option>
    </select>

    <section class="flex">
      <button
        @click="onSubmit"
        type="button"
        class="border-white-950 mr-5 h-10 w-full rounded-md border-2 bg-green-color text-white hover:bg-green-600 disabled:bg-slate-300 disabled:shadow md:my-5"
      >
        Sauvegarder
      </button>
      <button
        type="button"
        class="border-white-950 ml-5 h-10 w-full rounded-md border-2 bg-green-color text-white hover:bg-green-600 hover:shadow-box-shadow-color disabled:bg-slate-300 disabled:shadow md:my-5"
        @click="handleCancelSubscription"
      >
        Annuler
      </button>
    </section>
  </form>
</template>
