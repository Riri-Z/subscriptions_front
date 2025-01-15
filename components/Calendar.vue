<template>
  <div
    class="flex flex-col gap-4 rounded-xl bg-black p-5 align-middle text-white md:h-fit md:w-fit md:p-8 lg:w-[33rem] xl:w-[50rem]"
  >
    <header id="header" class="flex flex-row justify-between">
      <div id="month" class="flex flex-row justify-center gap-2 align-middle">
        <!-- Month navigation -->
        <section class="flex justify-center gap-2 align-middle">
          <span
            class="flex cursor-pointer items-center justify-center text-xl lg:text-3xl"
            @:click="handlePreviousMonth"
          >
            <p class="hover:text-purple-300"><</p>
            <!-- TODO  : use icon  -->
          </span>

          <span
            class="flex cursor-pointer items-center justify-center text-xl lg:text-3xl"
            @:click="handleNextMonth"
          >
            <p class="hover:text-purple-300">></p>
          </span>
          <p class="flex items-center justify-center text-xl lg:text-3xl">
            {{ currentMonthString }} {{ currentYear }}
          </p>
        </section>
      </div>
      <!-- SPEND AMOUNT -->
      <div id="totalSpend">
        <p class="text-sm md:text-base">Dépense prévue</p>
        <p id="sum" class="text-end">
          {{ subscriptionStore.getTotalExpensesByMonth }} €
        </p>
      </div>
    </header>
    <!-- TODO : ADD loading spinner -->

    <main class="flex flex-col">
      <!--  DAYS OF THE WEEKS -->
      <section id="days" class="mb-6 grid w-full grid-cols-7 gap-2">
        <p
          v-for="dayName in arrNameOfDays"
          :key="dayName"
          class="rounded-xl bg-slate-600 p-2 text-center text-xs lg:text-sm"
        >
          {{ dayName.slice(0, 3) }}
        </p>
      </section>

      <section class="grid w-full grid-cols-7 gap-2">
        <CalendarDay
          v-for="day in arrOfDays"
          :key="day?.id"
          :day="day && day.dayValue"
          :selected-day="isSelectedDay(day?.dayValue ?? null)"
          :source-date="sourceDate"
          :current-month="day?.currentMonth"
          :on-previous-month="handlePreviousMonth"
          :on-next-month="handleNextMonth"
          :current-date="day?.date"
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
  getDayInMonth,
} = useDate();

const subscriptionStore = useSubscriptionsStore();

function isSelectedDay(day: number | null) {
  if (!subscriptionStore.selectedDate || !day) return false;
  return day === getDayInMonth(subscriptionStore.selectedDate);
}

//Load subscription on mount component
onMounted(async () => {
  await subscriptionStore.getSubscriptionsMonthly(startDayOftheMonth.value);
});

//Load subscription when user switch month
watch(startDayOftheMonth, async (newDate) => {
  try {
    // When we switch month, reset selected date
    if (subscriptionStore.selectedDate) {
      const dateStartOfMonth = dayjs(newDate).startOf("month");
      subscriptionStore.setSelectedDate(dateStartOfMonth);
    }
    // Fetch subscription for the new month
    await subscriptionStore.getSubscriptionsMonthly(newDate);
  } catch (error) {
    console.error(error);
  }
});
</script>
