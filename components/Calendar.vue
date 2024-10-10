<template>
  <div
    class="flex flex-col justify-center gap-4 rounded-xl bg-black p-10 align-middle text-white"
  >
    <section id="header" class="flex flex-row justify-between">
      <div id="month" class="flex flex-row justify-center gap-2 align-middle">
        <span id="nav" class="flex flex-row gap-4 text-3xl">
          <p class="cursor-pointer" v-on:click="handlePreviousMonth"><</p>
          <p class="cursor-pointer" v-on:click="handleNextMonth">></p>
        </span>
        <div class="flex flex-row gap-2 text-3xl">
          <p>{{ currentMonthString }}</p>
          <p>{{ currentYear }}</p>
        </div>
      </div>
      <div id="totalSpend">
        <p>Monthly spend</p>
        <p id="sum" class="text-end">40€</p>
      </div>
    </section>
    <div>
      <section id="days" class="mb-6 grid h-6 grid-cols-7 gap-2">
        <p
          v-for="dayName in arrNameOfDays"
          class="w-16 rounded-xl bg-slate-600 p-2 text-center text-xs"
        >
          {{ dayName }}
        </p>
      </section>
      <section class="grid grid-cols-7 gap-2">
        <CalendarDay v-for="day in arrOfDays" :day="day" />
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDate } from "~/composables/useDate";
const {
  handlePreviousMonth,
  handleNextMonth,
  currentYear,
  currentMonthString,
  arrNameOfDays,
  arrOfDays,
  startDayOftheMonth,
} = useDate();
import { useSubscriptionsStore } from "~/store/subscriptionsStore";

const subscriptionStore = useSubscriptionsStore();

//Load subscription on mount component
onMounted(async () => {
  await subscriptionStore.getSubscriptionsMonthly(startDayOftheMonth.value);
});

////Load subscription when user update month
watch(startDayOftheMonth, async (newDate) => {
  await subscriptionStore.getSubscriptionsMonthly(newDate);
});
</script>

<style></style>
