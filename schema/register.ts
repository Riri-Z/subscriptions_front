import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("Nom obligatoire"),
  username: yup
    .string()
    .required("register.form.errors.name.required")
    .min(4, "register.form.errors.name.invalidLength"),
  email: yup
    .string()
    .email("register.form.errors.email.invalidFormat")
    .required("register.form.errors.email.required"),
  password: yup
    .string()
    .required("register.form.errors.password.required")
    .min(6, "register.form.errors.name.invalidLength"),
});

export type RegisterValues = yup.InferType<typeof registerSchema>;
