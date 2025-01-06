<template>
  <Form v-slot="{ meta }" @submit="onSubmit" class="flex flex-col gap-2">
    <div
      v-for="{ as, name, label, ...attrs } in props.schema.fields"
      :key="name"
    >
      <label class="block text-sm font-medium text-gray-700" :for="name">{{
        label
      }}</label>
      <Field
        class="autofill-bg placeHolder-gray-400 my-2 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
        :as="as"
        :id="name"
        :name="name"
        v-bind="attrs"
      />
      <ErrorMessage class="text-xs text-red-400" :name="name" />
    </div>
    <SubmitForm label="Connexion" :disabled="!meta.valid"></SubmitForm>
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
