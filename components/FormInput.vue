<template>
  <div class="flex flex-col">
    <label class="block text-sm font-medium text-gray-700" :for="id">{{
      label
    }}</label>
    <input
      class="autofill-bg placeHolder-gray-400 my-2 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
      :class="{
        'border-gray-300 focus:border-purple-500 focus:ring-purple-500':
          !isError && modelValue.length === 0,
        'border-red-500 focus:border-red-500 focus:ring-red-500': isError,
        'border-green-500 focus:border-green-500 focus:ring-green-500':
          modelValue.length > 0 && !isError,
      }"
      :id="id"
      :type="type"
      :placeHolder="placeHolder"
      :required="required"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />

    <p
      class="text-xs"
      :class="{
        'text-gray-400': !isError,
        'text-red-400': isError,
      }"
    >
      {{ condition }}
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  id: string;
  label: string;
  type: string;
  placeHolder: string;
  required: boolean;
  isError?: boolean;
  condition: string;
  modelValue: string;
}>();

defineEmits(["update:modelValue"]);
</script>
