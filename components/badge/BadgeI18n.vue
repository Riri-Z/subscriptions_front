<template>
  <div
    class="absolute end-6 top-4 flex flex-row justify-center gap-3 text-black"
  >
    <select
      v-model="langueSelected"
      class="self-center rounded-lg align-middle"
      name="langue"
    >
      <option
        v-for="langue in langueOptions"
        :key="langue.value"
        :value="langue.value"
      >
        {{ langue.text }}
      </option>
    </select>
  </div>
</template>

<script setup>
const langueOptions = ref([
  { text: "EN", value: "en" },
  { text: "FR", value: "fr" },
]);

const { setLocale, setLocaleCookie, getLocaleCookie } = useI18n();
const langueSelected = ref(null);

watch(langueSelected, (newSelected) => {
  setLocaleCookie(newSelected);
  setLocale(newSelected);
});

onMounted(() => {
  const defaultLangue = getLocaleCookie() ?? "en";
  langueSelected.value = defaultLangue;
  setLocale(defaultLangue);
});
</script>
