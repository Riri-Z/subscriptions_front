<script setup lang="ts">
import { registerSchema } from "~/schema/register";
import { loginSchema, type Login } from "~/schema/login";
import FormComponent from "~/components/forms/FormComponent.vue";
import type { CustomError } from "~/types/error/error";
import { loginMessages } from "~/utils/constants/toast-status-message";

const { signIn } = useAuth();
const { t } = useI18n();
const layout = "auth-forms";
const isLoading = ref(false);
definePageMeta({
  layout: "login",
});

async function redirectToRegisterPage() {
  await navigateTo("/register");
}

const formSchema = computed(() => ({
  fields: [
    {
      as: "input",
      name: "username",
      customLabel: t("login.form.labels.name"),
      placeholder: t("login.form.labels.name"),
      rules: loginSchema.fields.username,
    },
    {
      name: "password",
      customLabel: t("login.form.labels.password"),
      as: "input",
      type: "password",
      placeholder: t("login.form.labels.password"),
      rules: registerSchema.fields.password,
    },
  ],
}));
async function handleLogin(values: Login) {
  if (!values.username || !values.password) {
    return useNuxtApp().$toast.error(t(loginMessages.missingInput));
  }
  try {
    isLoading.value = true;
    const credentials = {
      username: values.username,
      password: values.password,
    };
    await signIn(credentials, { callbackUrl: "/dashboard" });
    isLoading.value = false;
  } catch (error: unknown) {
    console.log({ error });
    if (error === undefined) {
      useNuxtApp().$toast.error(t(loginMessages.errorUndefined));
      return;
    }
    if ((error as CustomError)?.statusCode) {
      useNuxtApp().$toast.error(t(loginMessages.wrongCredentials));
      return;
    }
    useNuxtApp().$toast.error(t(loginMessages.unknownError));
  } finally {
    isLoading.value = false;
  }
}

function handleResetPassword() {
  navigateTo("/request-reset-password");
}
</script>
<template>
  <NuxtLayout :name="layout">
    <div>
      <h1 class="mb-3 text-center text-4xl text-light">
        {{ $t("login.title") }}
      </h1>
      <p class="mb-4 text-center text-xs text-light md:text-xl">
        {{ $t("login.info") }}
        <a
          class="cursor-pointer text-link underline underline-offset-4"
          @click="redirectToRegisterPage"
        >
          {{ $t("login.redirectToRegister") }}
        </a>
      </p>
      <FormComponent
        :schema="formSchema"
        :is-loading="isLoading"
        @submit-form="handleLogin"
      />
      <a
        class="block cursor-pointer text-center align-middle text-sm text-green-400 underline underline-offset-4"
        @click="handleResetPassword"
      >
        {{ $t("login.resetPassword") }}
      </a>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
/* overrie the default autofill style */
.autofill-bg:-webkit-autofill {
  box-shadow: inset 0 0 0 1000px #9370db !important;
}
</style>
