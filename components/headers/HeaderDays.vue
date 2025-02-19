<template>
  <!-- List of days -->
  <div
    v-for="dayName in NAME_DAYS"
    :key="dayName"
    aria-label="Day of the week"
    class="my-1 rounded-xl bg-accent text-black font-semibold py-2 text-center text-xs lg:text-sm"
  >
    <span>
      {{ dayName.slice(0, 3) }}
    </span>
  </div>
</template>

<script lang="ts" setup>
const { NAME_DAYS } = useDate();
</script>
