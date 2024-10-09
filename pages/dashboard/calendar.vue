<template>
  <div class="m-auto text-primary-white-color">
    <Calendar />
  </div>
</template>

<script lang="ts" setup>
import Calendar from "~/components/Calendar.vue";
definePageMeta({
  layout: "dashboard",
});
</script>
