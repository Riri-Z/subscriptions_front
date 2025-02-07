<script lang="ts" setup>
import { useForm } from "vee-validate";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import * as yup from "yup";
import dayjs from "dayjs";
import {
  BillingCycle,
  SubscriptionCategory,
  type AvailableSuggestionSubscriptionWithIcon,
} from "~/types/store/subscriptionsStore";
import SuggestionList from "./SuggestionList.vue";
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

onMounted(() => {
  subscriptionStore.getAvailableSuggestionSubscriptionWithIcon();
});

const displaySuggestionStatus = ref(false);

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
  category: yup
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
      category: subscriptionStore.selectedSubscription.category,
    };
  } else {
    return {
      amount: 0,
      subscriptionName: "",
      startDate: subscriptionStore.selectedDate || "",
      endDate: "",
      billingCycle: BillingCycle.MONTHLY,
      category: SubscriptionCategory.OTHER,
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
const [category, subscriptionCategoryAttrs] = defineField("category");

const emit = defineEmits(["postSubscription"]);

const onSubmit = handleSubmit((values) => {
  emit("postSubscription", values);
});

function handleCancelSubscription() {
  subscriptionStore.setSelectedSubscription(null);
  subscriptionStore.closeModal();
}

/**
 * Allow to toggle displaySuggestionStatus
 */
function handleFocusInputName(value: boolean) {
  displaySuggestionStatus.value = value;
}

function handleSelectSubscription(
  subscription: AvailableSuggestionSubscriptionWithIcon,
) {
  console.log("subscription.name", subscription.name);
  // Update sbscription name
  subscriptionName.value = subscription.name;
  // toggle to false suggestion and therefore hide suggestion
  handleFocusInputName(false);
}
</script>

<template>
  <h1
    class="text-primary-black-color m-4 text-center text-base md:py-2 md:text-2xl"
  >
    {{
      subscriptionStore.selectedSubscription
        ? "Editer l'abonnement"
        : "Ajouter un abonnement"
    }}
  </h1>
  <form class="flex flex-col gap-3 md:p-2">
    <!-- subscription Name -->
    <label
      class="text-primary-black-color block text-sm font-bold"
      for="subscriptionName"
      >Nom<span class="text-red-500"> *</span></label
    >
    <div class="relative">
      <!-- Autocomple is disable to prevent double suggestion, "one-time-code" instead of false works in chrome -->
      <input
        id="subscriptionName"
        v-model="subscriptionName"
        autocomplete="one-time-code"
        list="subscriptions-lists"
        class="w-full rounded-md border px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2"
        name="subscriptionName"
        v-bind="subscriptionNameAttrs"
        @focus="handleFocusInputName(true)"
        @keyup.escape="handleFocusInputName(false)"
        @keyup.enter="handleFocusInputName(false)"
      />
      <SuggestionList
        v-if="displaySuggestionStatus"
        :available-suggestion-subscription="
          subscriptionStore.availableSuggestionSubscriptionWithIcon
        "
        @select-subscription="handleSelectSubscription"
      />
    </div>

    <!-- amount  -->
    <label class="text-primary-black-color font-bold" for="amount"
      >Montant<span class="text-red-500"> *</span></label
    >
    <input
      id="amount"
      v-model="amount"
      class="rounded-md border px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2"
      type="number"
      name="amount"
      v-bind="amountAttrs"
      @focus="handleFocusInputName(false)"
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
      class="rounded-md border px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2"
      name="startDate"
      v-bind="startDateAttrs"
      @focus="handleFocusInputName(false)"
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
      class="rounded-md border px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2"
      name="endDate"
      v-bind="endDateAttrs"
      @focus="handleFocusInputName(false)"
    />
    <span class="text-xs text-red-400">{{ errors.endDate }}</span>

    <!--BillingCycle  -->
    <label class="text-primary-black-color font-bold" for="billingCycle"
      >Cycle de paiement<span class="text-red-500"> *</span></label
    >
    <select
      id="billingCycle"
      v-model="billingCycle"
      class="rounded-md border px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2"
      name="billingCycle"
      v-bind="billingCycleAttrs"
      @focus="handleFocusInputName(false)"
    >
      <option value="WEEKLY">Hebdomadaire</option>
      <option value="MONTHLY">Mensuel</option>
      <option value="YEARLY">Annuel</option>
    </select>
    <!-- Category  -->
    <label class="text-primary-black-color font-bold" for="category"
      >Catégorie<span class="text-red-500"> *</span></label
    >
    <select
      id="category"
      v-model="category"
      class="rounded-md border px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2"
      name="billingCycle"
      v-bind="subscriptionCategoryAttrs"
      @focus="handleFocusInputName(false)"
    >
      <option
        v-for="category_option in CATEGORIES_OPTIONS"
        :key="category_option?.value"
        :value="category_option?.value"
      >
        {{ category_option.text }}
      </option>
    </select>

    <section class="flex">
      <button
        type="button"
        class="my-4 mr-5 h-10 w-full rounded-lg bg-soft-green-color text-white disabled:bg-slate-300 disabled:shadow"
        @click="onSubmit"
      >
        Sauvegarder
      </button>
      <button
        type="button"
        class="my-4 ml-5 h-10 w-full rounded-lg bg-soft-green-color text-white disabled:bg-slate-300 disabled:shadow"
        @click="handleCancelSubscription"
      >
        Annuler
      </button>
    </section>
  </form>
</template>
