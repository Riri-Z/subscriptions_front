<template>
  <Form v-slot="{ meta }" class="flex flex-col gap-1" @submit="onSubmit">
    <div
      v-for="{ as, name, label, ...attrs } in props.schema.fields"
      :key="name"
    >
      <label
        class="text-secondary-text-color block text-sm font-medium"
        :for="name"
        >{{ label }}</label
      >
      <Field
        :id="name"
        class="autofill-bg placeHolder-gray-400 my-2 w-full rounded-md border px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2"
        :as="as"
        :name="name"
        v-bind="attrs"
        validate-on-input
      />
      <ErrorMessage class="text-xs text-error-color" :name="name" />
    </div>
    <SubmitForm label="Connexion" :disabled="!meta.valid" />
  </Form>
</template>

<script lang="ts" setup>
import { Form, Field, ErrorMessage, type GenericObject } from "vee-validate";
import SubmitForm from "./SubmitForm.vue";

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["submitForm"]);

function onSubmit<T extends GenericObject>(formValue: T): void {
  emit("submitForm", formValue);
}
</script>
