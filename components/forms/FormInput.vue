<template>
  <div class="flex flex-col">
    <label class="block text-sm font-medium text-gray-700" :for="id">{{
      label
    }}</label>

    <div class="relative flex gap-2 align-middle">
      <input
        :id="id"
        class="autofill-bg placeHolder-gray-400 my-2 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
        :class="{
          'border-gray-300 focus:border-purple-500 focus:ring-purple-500':
            !isError && modelValue.length === 0,
          'border-red-500 focus:border-red-500 focus:ring-red-500': isError,
          'border-green-500 focus:border-green-500 focus:ring-green-500':
            modelValue.length > 0 && !isError,
        }"
        :type="type"
        :placeHolder="placeHolder"
        :required="required"
        autocomplete="on"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      >
      <button
        v-if="id === 'password'"
        type="button"
        class="absolute inset-y-0 right-0 flex items-center px-3"
        @click.stop="toggleTypePassword"
      >
        <NuxtImg
          :src="showPassword ? '/icons/eye-closed.svg' : '/icons/eye-open.svg'"
          width="24"
          height="24"
          alt="eye"
        />
      </button>
    </div>
    <p
      v-if="isError || route?.name === 'register'"
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
const props = defineProps<{
  id: string;
  label: string;
  type: string;
  placeHolder: string;
  required: boolean;
  isError?: boolean;
  condition: string;
  modelValue: string;
}>();
const showPassword = ref(false);

const route = useRoute();

function toggleTypePassword() {
  showPassword.value = !showPassword.value;
  const input = document.getElementById(props.id) as HTMLInputElement;
  if (input) {
    input.type = showPassword.value ? "text" : "password";
  }
}

defineEmits(["update:modelValue"]);
</script>
