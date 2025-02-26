import * as yup from "yup";

export const resetPasswordSchema = yup.object({

  email: yup
    .string()
    .email("Le format suivant est attendu ex : email@example.com")
    .required("Email obligatoire"),

});

export type RegisterValues = yup.InferType<typeof resetPasswordSchema>;
