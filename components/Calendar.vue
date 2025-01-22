<template>
  <div
    class="flex h-fit w-[350px] flex-col gap-2 rounded-xl bg-black p-6 align-middle text-white md:w-[550px] md:p-4 lg:w-[36rem] xl:w-[50rem]"
  >
    <!-- Month navigation -->
    <header id="header" class="flex flex-row justify-between">
      <div id="month" class="flex flex-row justify-center gap-2 align-middle">
        <section class="flex justify-center gap-2 align-middle">
          <span
            class="flex cursor-pointer items-center justify-center text-xl lg:text-3xl"
            @:click="dateStore.setPreviousMonth()"
          >
            <p class="hover:text-purple-300"><</p>
          </span>

          <span
            class="flex cursor-pointer items-center justify-center text-xl lg:text-3xl"
            @click="dateStore.setNextMonth()"
          >
            <p class="hover:text-purple-300">></p>
          </span>
          <section
            class="flex items-center justify-center gap-2 text-base md:text-lg lg:text-3xl"
          >
            <p class="cursor-pointer" @click="handleClickMonth">
              {{ dateStore.getCurrentMonthString }}
            </p>
            <p class="cursor-pointer" @click="handleClickYear">
              {{ dateStore.getCurrentYear }}
            </p>
          </section>
        </section>
      </div>
      <!-- SPEND AMOUNT -->
      <div id="totalSpend">
        <p class="text-sm md:text-base">Dépense prévue</p>
        <p id="sum" class="text-end text-lg">
          {{ subscriptionStore.getTotalExpensesByMonth }} €
        </p>
      </div>
    </header>

    <main
      class="m-1 flex h-[350px] flex-col justify-center md:m-4 md:h-[450px] lg:h-[500px] laptop:h-[580px] 2xl:h-[600px]"
    >
      <MonthList v-if="displayMonth" @select-month="handleSelectMonth" />

      <section v-else class="grid w-full grid-cols-7 gap-2">
        <HeaderDays />
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
import { useDateStore } from "~/store/dateStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import HeaderDays from "./headers/HeaderDays.vue";

const dateStore = useDateStore();
const subscriptionStore = useSubscriptionsStore();

const displayMonth: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);

function isSelectedDay(date: Dayjs) {
  return date.format("YYYY-MM-DD") === subscriptionStore.selectedDate;
}

function handleClickYear() {
  console.log("click on year");
}
function handleClickMonth() {
  displayMonth.value = !displayMonth.value;
}

async function handleSelectMonth(key: number) {
  // Ignore user input if a new month is selected while one is already selected
  loading.value = true;
  if (key < 12) {
    try {
      // Set date to start of month
      const newDate = dateStore.getCurrentDate.set("month", key).set("date", 1);
      // Update current date
      dateStore.setCurrentDate(newDate);
      // Update selected date
      subscriptionStore.setSelectedDate(newDate);
      // Fetch subscription of new date
      await subscriptionStore.getSubscriptionsMonthly(
        newDate.format("YYYY-MM-DD"),
      );
      // Compute array of days of the new date's month
      dateStore.setDaysInMonth(newDate);
      displayMonth.value = false;
    } catch (error) {
      console.error(
        "something wrong happened while selecting new month",
        error,
      );
    }
  } else {
    console.error("undefined month selected  :" + key);
  }
  loading.value = false;
}
//Load subscription on mount component
onMounted(async () => {
  await subscriptionStore.getSubscriptionsMonthly(
    dayjs(dateStore.currentDate).format("YYYY-MM-DD"),
  );
});
</script>
