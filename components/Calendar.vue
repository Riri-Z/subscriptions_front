<template>
  <div
    class="flex flex-col justify-center gap-4 rounded-xl bg-black p-10 align-middle text-white"
  >
    <header id="header" class="flex flex-row justify-between">
      <div id="month" class="flex flex-row justify-center gap-2 align-middle">
        <!-- Month navigation -->
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
          </span>
        </section>

        <div class="flex flex-row gap-2 align-middle text-3xl">
          <p>{{ currentMonthString }}</p>
          <p>{{ currentYear }}</p>
        </div>
      </div>
      <!-- SPEND AMOUNT -->
      <div id="totalSpend">
        <p>Monthly spend</p>
        <p id="sum" class="text-end">40€</p>
      </div>
    </header>
    <!-- TODO : ADD loading spinner -->

    <main class="flex h-max w-[530px] flex-col">
      <!--  DAYS OF THE WEEKS -->
      <section id="days" class="mb-6 grid h-6 w-full grid-cols-7 gap-2">
        <p
          v-for="dayName in arrNameOfDays"
          :key="dayName"
          class="rounded-xl bg-slate-600 p-2 text-center text-xs"
        >
          {{ dayName }}
        </p>
      </section>

      <section class="grid w-full grid-cols-7 gap-2">
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
    </main>
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

//Load subscription on mount component
onMounted(async () => {
  await subscriptionStore.getSubscriptionsMonthly(startDayOftheMonth.value);
});

//Load subscription when user update month
watch(startDayOftheMonth, async (newDate) => {
  try {
    subscriptionStore.setSelectedDate(dayjs(newDate));
    await subscriptionStore.getSubscriptionsMonthly(newDate);
  } catch (error) {
    console.error(error);
  }
});
</script>
