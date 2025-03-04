import * as yup from "yup";
import {
  BillingCycle,
  SubscriptionCategory,
} from "~/types/store/subscriptionsStore";

export const addEditSubscriptionValues = yup.object({
  subscriptionName: yup.string().min(2).required("Un nom est requis"),
  amount: yup
    .number()
    .default(0)
    .min(0)
    .max(999999)
    .typeError("Doit être un nombre valide")
    .required("Un montant est requis"),
  startDate: yup.string().required("Une date de début est requise"),

  endDate: yup.string(),
  billingCycle: yup.mixed<BillingCycle>().oneOf(Object.values(BillingCycle)),
  category: yup
    .mixed<SubscriptionCategory>()
    .oneOf(Object.values(SubscriptionCategory))
    .default(SubscriptionCategory.OTHER)
    .required(
      "Catégorie obligatoire. Sélectionnez 'Autre' si aucune option ne convient.",
    ),
});

export type AddEditSubscriptionValues = yup.InferType<
  typeof addEditSubscriptionValues
>;
