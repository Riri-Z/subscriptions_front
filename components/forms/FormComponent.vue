<template>
  <Form
    v-slot="{ meta, errors }"
    class="flex flex-col gap-1"
    @submit="onSubmit"
  >
    <div
      v-for="{ as, name, label, ...attrs } in props.schema.fields"
      :key="name"
    >
      <label class="block text-sm font-medium text-light" :for="name">{{
        label
      }}</label>
      <Field
        :id="name"
        class="autofill-bg placeHolder-gray-400 my-2 w-full rounded-md border px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2"
        :as="as"
        :name="name"
        v-bind="attrs"
        validate-on-input
      />
      <span class="text-xs text-error-color" v-if="errors[name]"
        >⛔️ {{ $t(errors[name]) }}</span
      >
    </div>
    <SubmitForm
      :label="label"
      :disabled="!meta.valid || disabled"
      :is-loading="props.isLoading"
    />
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
  label: {
    type: String,
    default: "Connexion",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submitForm"]);

function onSubmit<T extends GenericObject>(formValue: T): void {
  emit("submitForm", formValue);
}
</script>
