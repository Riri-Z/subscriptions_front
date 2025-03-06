import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup
    .string()
    .required("login.form.errors.name.required")
    .min(4, "login.form.errors.name.invalidLength"),
  password: yup
    .string()
    .required("login.form.errors.password.required")
    .min(6, "login.form.errors.password.invalidLength"),
});

export type Login = yup.InferType<typeof loginSchema>;
