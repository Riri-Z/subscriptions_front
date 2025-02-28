import * as yup from "yup";

export const requestNewPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Le format suivant est attendu ex : email@example.com")
    .required("Email obligatoire"),
});
export const defineNewPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Veuillez renseigner un mot de passe")
    .min(6, "Le mot de passe doit être de 6 charactères minimum"),
  confirmPassword: yup
    .string()
    .required("Veuillez confirmer votre mot de passe")
    .min(6, "Le mot de passe doit être de 6 charactères minimum"),
});

export type RegisterValues = yup.InferType<typeof requestNewPasswordSchema>;
export type RegisterValuesNewPassword = yup.InferType<
  typeof defineNewPasswordSchema
>;
