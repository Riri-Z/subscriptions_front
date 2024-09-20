<template>
  <div class="flex flex-col gap-5">
    <label class="block text-sm font-medium text-gray-700" :for="id">{{
      label
    }}</label>
    <input
      class="autofill-bg w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
      :class="{
        'border-2 border-red-500 focus:border-red-500': isInvalid,
        'border-2 border-green-300 focus:border-green-300': isInvalid,
      }"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <p v-if="isInvalid" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  modelValue?: string;
  required?: boolean;
  isInvalid?: boolean;
  errorMessage?: () => string | globalThis.Ref<string, string>;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  required: false,
  isInvalid: false,
});

defineEmits(["update:modelValue"]);
</script>
