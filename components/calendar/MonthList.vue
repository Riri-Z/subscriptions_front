<template>
  <div class="m-4 grid grid-cols-4 gap-2 px-2">
    <button
      v-for="month in MONTH_NAME"
      :key="month.key"
      class="flex w-24 cursor-pointer items-center justify-center self-center justify-self-center rounded-full text-center text-base hover:scale-105 hover:rounded-full lg:text-xl laptop:text-2xl laptop:hover:scale-125"
      @click="emit('selectMonth', month.key)"
    >
      <p>
        {{ capitalized(month.value) }}
      </p>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useDate } from "~/composables/useDate";

const { MONTH_NAME } = useDate();
const emit = defineEmits(["selectMonth"]);
</script>
