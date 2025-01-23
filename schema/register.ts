import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("Nom obligatoire"),
  username: yup
    .string()
    .required("Nom d'utilisateur obligatoire")
    .min(4, 'Le nom d"utilisateur doit être de 4 lettres minimum'),
  email: yup
    .string()
    .email("Le format suivant est attendu ex : email@example.com")
    .required("Email obligatoire"),
  password: yup
    .string()
    .required("Mot de passe est obligatoire")
    .min(6, "Le mot de passe doit être de 6 charactères minimum"),
});

export type RegisterValues = yup.InferType<typeof registerSchema>;
