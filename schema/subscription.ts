import * as yup from "yup";
import {
  BillingCycle,
  SubscriptionCategory,
} from "~/types/store/subscriptionsStore";

export const addEditSubscriptionValues = yup.object({
  subscriptionName: yup
    .string()
    .min(2, "formSubscription.errors.name.length")
    .required("formSubscription.errors.name.required"),
  amount: yup
    .number()
    .default(0)
    .min(0)
    .max(999999)
    .typeError("formSubscription.errors.amount.typeError")
    .required("formSubscription.errors.amount.required"),
  startDate: yup
    .string()
    .required("formSubscription.errors.startDate.required"),
  endDate: yup.string(),
  billingCycle: yup.mixed<BillingCycle>().oneOf(Object.values(BillingCycle)),
  category: yup
    .mixed<SubscriptionCategory>()
    .oneOf(Object.values(SubscriptionCategory))
    .default(SubscriptionCategory.OTHER)
    .required("formSubscription.errors.category.required"),
});

export type AddEditSubscriptionValues = yup.InferType<
  typeof addEditSubscriptionValues
>;
