<template>
  <div
    class="flex flex-col justify-center gap-4 rounded-xl bg-black p-10 align-middle text-white"
  >
    <section id="header" class="flex flex-row justify-between">
      <div id="month" class="flex flex-row justify-center gap-2 align-middle">
        <section class="flex justify-center align-middle">
          <span
            class="flex h-[35px] w-[35px] cursor-pointer justify-center text-3xl"
            @:click="handlePreviousMonth"
          >
            <p class="hover:text-purple-300"><</p>
            <!-- TODO  : use icon  -->
          </span>

          <span
            class="align-items flex h-[35px] w-[35px] cursor-pointer justify-center text-3xl"
            @:click="handleNextMonth"
          >
            <p class="hover:text-purple-300">></p>
            <!-- TODO  : use icon  -->
          </span>
        </section>

        <div class="flex flex-row gap-2 align-middle text-3xl">
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
          :key="dayName"
          class="w-16 rounded-xl bg-slate-600 p-2 text-center text-xs"
        >
          {{ dayName }}
        </p>
      </section>
      <section class="grid grid-cols-7 gap-2">
        <CalendarDay
          v-for="day in arrOfDays"
          :key="day?.id"
          :day="day && day.dayValue"
          :source-date="sourceDate"
          :current-date="
            day && day.dayValue && sourceDate.set('date', day.dayValue)
          "
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { useDate } from "~/composables/useDate";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";

const {
  handlePreviousMonth,
  handleNextMonth,
  currentYear,
  currentMonthString,
  arrNameOfDays,
  arrOfDays,
  startDayOftheMonth,
  sourceDate,
} = useDate();

const subscriptionStore = useSubscriptionsStore();
//Logic hightLight selected day

//Load subscription on mount component
onMounted(async () => {
  await subscriptionStore.getSubscriptionsMonthly(startDayOftheMonth.value);
});

////Load subscription when user update month
watch(startDayOftheMonth, async (newDate) => {
  try {
    subscriptionStore.setSelectedDate(dayjs(newDate));
    await subscriptionStore.getSubscriptionsMonthly(newDate);
  } catch (error) {
    console.error(error);
  }
});
</script>
