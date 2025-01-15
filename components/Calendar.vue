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
            @:click="dateStore.setPreviousMonth()"
          >
            <p class="hover:text-purple-300"><</p>
            <!-- TODO  : use icon  -->
          </span>

          <span
            class="flex cursor-pointer items-center justify-center text-xl lg:text-3xl"
            @:click="dateStore.setNextMonth()"
          >
            <p class="hover:text-purple-300">></p>
          </span>
          <p class="flex items-center justify-center text-xl lg:text-3xl">
            {{ dateStore.getCurrentMonthString }} {{ dateStore.getCurrentYear }}
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
          v-for="day in dateStore.daysInMonth"
          :key="day?.id"
          :day="day && day.dayValue"
          :selected-day="isSelectedDay(day.date)"
          :source-date="dateStore.sourceDate"
          :current-month="day?.currentMonth"
          :current-date="day?.date"
        />
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import dayjs, { Dayjs } from "dayjs";
import { useDate } from "~/composables/useDate";
import { useDateStore } from "~/store/dateStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
const {
  arrNameOfDays,
  arrOfDays,
  /*   startDayOftheMonth,
  sourceDate, */
} = useDate();

const dateStore = useDateStore();
const subscriptionStore = useSubscriptionsStore();

const activeDate = ref(dateStore.currentDate);

function isSelectedDay(day: Dayjs) {
  if (!subscriptionStore.selectedDate || !day) return false;
  return day.format("YYYY-MM-DD") === subscriptionStore.selectedDate;
}

//Load subscription on mount component
onMounted(async () => {
  await subscriptionStore.getSubscriptionsMonthly(
    dayjs(dateStore.currentDate).format("YYYY-MM-DD"),
  );
});
</script>
