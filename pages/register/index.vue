<template>
  <NuxtLayout :name="layout">
    <h1 class="mb-1 text-center text-xl sm:mb-3 sm:text-4xl">
      {{ t("register.title") }}
    </h1>
    <p class="mb-1 text-center text-xs font-semibold sm:mb-3 sm:text-sm">
      {{ t("register.info") }}
    </p>
    <FormComponent :schema="formSchema" @submit-form="handleSaveRegister" />
    <p class="text-center">
      {{ t("register.hasAnAccount") }}
      <a
        class="cursor-pointer text-green-400 underline underline-offset-4"
        @click="redirectTologinPage"
      >
        {{ t("register.redirectToLogin") }}
      </a>
    </p>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { registerSchema, type RegisterValues } from "~/schema/register";
import { useAuthStore } from "~/store/authStore";
import FormComponent from "~/components/forms/FormComponent.vue";
import { registerMessages } from "~/utils/constants/toast-status-message";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
definePageMeta({
  layout: "login",
  auth: false,
});
const layout = "auth-forms";

const authStore = useAuthStore();

async function redirectTologinPage() {
  await navigateTo("/login");
}

async function handleSaveRegister(values: RegisterValues) {
  const { username, password, email } = values;
  try {
    const statusCode: number | undefined = await authStore.registerUser(
      username,
      password,
      email,
    );
    if (statusCode === 201) {
      useNuxtApp().$toast.success(t(registerMessages.success));
      setTimeout(() => {
        navigateTo("/login");
      }, 2000);
    }
  } catch (error: unknown) {
    console.error("error", error);
    if (typeof error === "object" && error !== null && "statusCode" in error) {
      const statusCode = (error as { statusCode: number }).statusCode;
      if (statusCode === 409) {
        return useNuxtApp().$toast.error(t(registerMessages.conflict));
      }
    } else {
      useNuxtApp().$toast.error(t(registerMessages.unknownError));
    }
  }
}

const formSchema = computed(() => ({
  fields: [
    {
      name: "username",
      customLabel: t("register.form.labels.name"),
      as: "input",
      placeholder: t("register.form.labels.name"),
      rules: registerSchema.fields.username,
    },
    {
      name: "email",
      customLabel: t("register.form.labels.email"),
      as: "input",
      placeholder: t("register.form.labels.email"),
      rules: registerSchema.fields.email,
    },
    {
      name: "password",
      customLabel: t("register.form.labels.password"),
      as: "input",
      type: "password",
      placeholder: t("register.form.labels.password"),
      rules: registerSchema.fields.password,
    },
  ],
}));
</script>
