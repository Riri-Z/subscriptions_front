<template>
  <!-- Calendar -->
  <div
    ref="calendarContainer"
    class="flex w-[98vw] flex-col gap-2 rounded-xl bg-card-bg-color p-2 align-middle text-white md:w-[550px] md:p-4 lg:h-[580px] lg:w-[36rem] xl:w-[50rem]"
    :style="{ opacity: subscriptionStore.isDeleteModalOpen ? 0.1 : 1 }"
  >
    <!-- Month navigation -->
    <header id="header" class="flex flex-row justify-between">
      <div
        id="month"
        class="flex flex-row justify-center gap-1 align-middle md:ml-2"
      >
        <section class="flex justify-center gap-2 align-middle">
          <div class="flex min-w-8">
            <NavMonth nameIcon="chevron-left" @click="handlePrevMonth" />
            <NavMonth nameIcon="chevron-right" @click="handleNextMonth" />
          </div>
          <section
            class="flex items-center justify-center gap-2 text-base md:text-lg lg:text-3xl"
          >
            <p class="cursor-pointer" @click="handleClickMonth">
              {{ dateStore.getCurrentMonthString }}
            </p>
            <p class="cursor-default">
              {{ dateStore.getCurrentYear }}
            </p>
          </section>
        </section>
      </div>
      <!-- SPEND AMOUNT -->
      <div id="totalSpend" class="mr-4">
        <p class="text-sm md:text-base">Total</p>
        <p id="sum" class="cursor-pointer text-end text-2xl">
          {{ subscriptionStore.getTotalExpensesByMonth }} €
        </p>
      </div>
    </header>

    <span ref="headerDays" class="grid w-full grid-cols-7 gap-2">
      <HeaderDays v-if="!displayMonth" />
    </span>
    <main class="flex flex-col justify-center" :style="{ height: mainHeight }">
      <MonthList
        v-if="displayMonth"
        :style="{ height: `${calendarHeight}px` }"
        @select-month="handleSelectMonth"
      />

      <section
        v-else
        class="relative"
        :style="{ height: calendarHeight + 'px' }"
      >
        <!-- Days list -->
        <span
          v-if="isLoading"
          class="absolute right-0 top-0 z-10 flex h-full w-full rounded-xl bg-black bg-opacity-90"
        >
          <NuxtImg
            class="m-auto align-middle text-gray-300"
            :style="{ height: `${calendarHeight}px` }"
            src="icons/fade-stagger-circles.svg"
            width="24"
            height="24"
            alt="spinner"
          />
        </span>
        <span ref="calendarDay" class="grid w-full grid-cols-7 gap-2">
          <CalendarDay
            v-for="day in dateStore.daysInMonth"
            :key="day?.id"
            :day="day && day.dayValue"
            :selected-day="isSelectedDay(day.date)"
            :source-date="dateStore.sourceDate"
            :current-month="day?.currentMonth"
            :current-date="day?.date"
          />
        </span>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { useDateStore } from "~/store/dateStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import HeaderDays from "./headers/HeaderDays.vue";

const dateStore = useDateStore();
const subscriptionStore = useSubscriptionsStore();

const displayMonth: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);
const calendarDay: Ref<HTMLElement | null> = ref(null);
const calendarContainer: Ref<HTMLElement | null> = ref(null);
const mainHeight = computed(() => `${calendarHeight}px`);

const { measureContainer, measureCalendar, calendarHeight } =
  useUseCalendarDimensions();

onMounted(() => {
  measureContainer(calendarContainer.value);
  measureCalendar(calendarDay.value);
});

function isSelectedDay(date: Dayjs) {
  return date.format("YYYY-MM-DD") === subscriptionStore.selectedDate;
}

function handleClickMonth() {
  if (subscriptionStore.isDeleteModalOpen) return;
  displayMonth.value = !displayMonth.value;
}

async function handleNextMonth() {
  if (subscriptionStore.isDeleteModalOpen) return;

  isLoading.value = true;
  try {
    const res = await dateStore.setNextMonth();
    if (!res) {
      throw new Error("Error while selecting next month");
    }
  } catch (error) {
    console.error("something wrong happened while selecting next month", error);
  } finally {
    isLoading.value = false;
  }
}
async function handlePrevMonth() {
  if (subscriptionStore.isDeleteModalOpen) return;
  isLoading.value = true;
  try {
    const res = await dateStore.setPreviousMonth();
    if (!res) {
      throw new Error("Error while selecting prev month");
    }
  } catch (error) {
    console.error("something wrong happened while selecting prev month", error);
  } finally {
    isLoading.value = false;
  }
}

async function handleSelectMonth(key: number) {
  if (subscriptionStore.isDeleteModalOpen) return;

  // Ignore user input if a new month is selected while one is already selected
  isLoading.value = true;
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
  isLoading.value = false;
}
//Load subscription on mount component
onMounted(async () => {
  await subscriptionStore.getSubscriptionsMonthly(
    dayjs(dateStore.currentDate).format("YYYY-MM-DD"),
  );
});
</script>
