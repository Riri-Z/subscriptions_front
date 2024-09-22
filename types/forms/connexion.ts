export interface FormField {
  id: string;
  label: string;
  type: string;
  isError: boolean;
  required: boolean;
  placeHolder: string;
  errorMessage: string;
  minLength: number;
  value: string;
}

export interface FormData {
  username: FormField;
  password: FormField;
  [key: string]: FormField;
}

export interface FormDataRegister extends FormData {
  name: FormField;
  email: FormField;
}
