import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup
    .string()
    .required("Nom obligatoire")
    .min(4, "Le nom d'utilisateur doit être de 4 charactères minimum"),
  password: yup
    .string()
    .required("Mot de passe est obligatoire")
    .min(6, "Le mot de passe doit être de 6 charactères minimum"),
});

export type Login = yup.InferType<typeof loginSchema>;
