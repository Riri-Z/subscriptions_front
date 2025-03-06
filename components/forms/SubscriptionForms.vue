<script lang="ts" setup>
import { useForm } from "vee-validate";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import { addEditSubscriptionValues } from "~/schema/subscription";

import dayjs from "dayjs";
import {
  BillingCycle,
  SubscriptionCategory,
  type AvailableSuggestionSubscriptionWithIcon,
} from "~/types/store/subscriptionsStore";
import SuggestionList from "./SuggestionList.vue";
import { postSubscriptionMessages } from "~/utils/constants/toast-status-message";
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

function handleDisplaySuggestion(value: boolean) {
  displaySuggestionStatus.value = value;
}

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
      startDate: subscriptionStore.getSelectedDate || "",
      endDate: "",
      billingCycle: BillingCycle.MONTHLY,
      category: SubscriptionCategory.OTHER,
    };
  }
});

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: addEditSubscriptionValues,
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
defineProps<{ isSubmiting: boolean }>();
const onSubmit = handleSubmit((values) => {
  if (
    values.endDate &&
    values.startDate &&
    dayjs(values.endDate).diff(dayjs(values.startDate)) < 0
  ) {
    useNuxtApp().$toast.error(
      postSubscriptionMessages.startDateMustBeBeforeEndDate,
    );
    return;
  }
  return emit("postSubscription", values);
});

function handleCancelSubscription() {
  subscriptionStore.setSelectedSubscription(null);
  subscriptionStore.closeModal();
}

function handleSelectSubscription(
  subscription: AvailableSuggestionSubscriptionWithIcon,
) {
  // Update sbscription name
  subscriptionName.value = subscription.name;
  // toggle to false suggestion and therefore hide suggestion
  handleDisplaySuggestion(false);
}
</script>

<template>
  <h1 class="text-primary-black-color m-4 text-center text-base md:text-2xl">
    {{
      subscriptionStore.selectedSubscription
        ? $t("subscriptionDetails.editSubscription")
        : $t("subscriptionDetails.addSubscription")
    }}
  </h1>
  <form class="flex flex-col gap-3 text-sm md:p-2">
    <!-- subscription Name -->
    <div class="form-group">
      <label class="text-primary-black-color w-fit" for="subscriptionName"
        >{{ $t("formSubscription.name")
        }}<span class="text-red-500"> *</span></label
      >
      <div class="relative">
        <input
          id="subscriptionName"
          v-model="subscriptionName"
          list="subscriptions-lists"
          class="w-full rounded-md border px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2"
          name="subscriptionName"
          v-bind="subscriptionNameAttrs"
          @focus="handleDisplaySuggestion(true)"
          @focusout="handleDisplaySuggestion(false)"
        />
        <SuggestionList
          v-if="displaySuggestionStatus"
          :available-suggestion-subscription="
            subscriptionStore.availableSuggestionSubscriptionWithIcon
          "
          @select-subscription="handleSelectSubscription"
        />
      </div>
    </div>

    <!-- amount  -->
    <div class="form-group">
      <label class="" for="amount"
        >{{ $t("formSubscription.amount")
        }}<span class="text-red-500"> *</span></label
      >
      <input
        id="amount"
        v-model="amount"
        class="rounded-md border px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2"
        type="number"
        name="amount"
        v-bind="amountAttrs"
      />
      <span class="pt-1 text-xs text-red-400">{{ errors.amount }}</span>
    </div>

    <!--  startDate-->
    <div class="form-group">
      <label class="text-primary-black-color" for="startDate"
        >{{ $t("formSubscription.start")
        }}<span class="text-red-500"> *</span></label
      >
      <input
        id="startDate"
        v-model="startDate"
        type="date"
        class="rounded-md border px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2"
        name="startDate"
        v-bind="startDateAttrs"
      />
      <span class="pt-1 text-xs text-red-400">{{ errors.startDate }}</span>
    </div>
    <!-- endDate -->
    <div class="form-group">
      <label class="text-primary-black-color" for="endDate">{{
        $t("formSubscription.end")
      }}</label>
      <input
        id="endDate"
        v-model="endDate"
        type="date"
        class="rounded-md border px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2"
        name="endDate"
        v-bind="endDateAttrs"
      />
      <span class="pt-1 text-xs text-red-400">{{ errors.endDate }}</span>
    </div>
    <!--BillingCycle  -->
    <div class="form-group">
      <label class="text-primary-black-color" for="billingCycle"
        >{{ $t("formSubscription.cycle")
        }}<span class="text-red-500"> *</span></label
      >
      <select
        id="billingCycle"
        v-model="billingCycle"
        class="rounded-md border px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2"
        name="billingCycle"
        v-bind="billingCycleAttrs"
      >
        <option value="WEEKLY">Hebdomadaire</option>
        <option value="MONTHLY">Mensuel</option>
        <option value="YEARLY">Annuel</option>
      </select>
    </div>
    <!-- Category  -->
    <div class="form-group">
      <label class="text-primary-black-color" for="category"
        >{{ $t("formSubscription.category")
        }}<span class="text-red-500"> *</span></label
      >
      <select
        id="category"
        v-model="category"
        class="relative max-w-full rounded-md border px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2"
        name="billingCycle"
        v-bind="subscriptionCategoryAttrs"
      >
        <option
          v-for="category_option in CATEGORIES_OPTIONS"
          :key="category_option?.value"
          :value="category_option?.value"
        >
          {{ category_option.text }}
        </option>
      </select>
      <span class="pt-1 text-xs text-red-400">{{ errors.category }}</span>
    </div>
    <!-- Actions -->
    <section class="flex">
      <button
        type="button"
        :disabled="isSubmiting"
        class="btn-secondary my-4 mr-5 h-10 w-full rounded-lg text-light"
        @click="onSubmit"
      >
        <p class="text-sm">{{ $t("formSubscription.cta.save") }}</p>
      </button>
      <button
        type="button"
        :disabled="isSubmiting"
        class="btn-secondary my-4 ml-5 h-10 w-full rounded-lg text-light"
        @click="handleCancelSubscription"
      >
        <p class="text-sm">{{ $t("formSubscription.cta.cancel") }}</p>
      </button>
    </section>
  </form>
</template>

<style lang="postcss" scoped>
.form-group {
  @apply flex flex-col;
}
</style>
