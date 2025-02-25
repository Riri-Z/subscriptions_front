<template>
  <!-- Calendar -->
  <div
    ref="calendarContainer"
    class="flex w-[95vw] flex-col gap-2 rounded-xl bg-secondary p-2 align-middle text-light shadow-custom sm:w-[90vw] md:w-[550px] md:p-4 lg:h-fit lg:w-[36rem] xl:w-[50rem]"
    :style="{ opacity: subscriptionStore.isModalOpen ? 0.1 : 1 }"
  >
    <!-- Month navigation -->
    <CalendarHeader
      :years-range="yearChoicesAvailableRange"
      :display-month="displayMonth"
      :display-year="displayYear"
      :is-loading="isLoading"
      @prev-month="handlePrevOption"
      @next-month="handleNextOption"
      @click-month="handleClickMonth"
      @click-year="handleClickYear"
    />

    <main
      class="relative flex flex-col justify-center"
      :style="{ height: mainHeight }"
    >
      <!-- Loader -->
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
      <MonthList
        v-if="displayMonth"
        :style="{ height: `${calendarHeight}px` }"
        @select-month="handleMonthSelection"
      />
      <YearList
        v-if="displayYear"
        ref="yearListComponent"
        :style="{ height: `${calendarHeight}px` }"
        :current-date="dateStore.getCurrentDate"
        @select-year="handleYearSelection"
      />
      <!-- Days list -->
      <section v-if="!displayMonth && !displayYear">
        <span ref="calendarCell" class="grid w-full grid-cols-7 gap-2">
          <CalendarCell
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
import type { Dayjs, UnitType } from "dayjs";
import { useDateStore } from "~/store/dateStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import MonthList from "~/components/calendar/MonthList.vue";
import YearList from "~/components/calendar/YearList.vue";
import type YearListComponentType from "~/components/calendar/YearList.vue";
import { YEAR_ACTION } from "~/types/yearAction/yearAction";
import CalendarCell from "./CalendarCell.vue";
import dayjs from "dayjs";
const yearListComponent = ref<InstanceType<
  typeof YearListComponentType
> | null>(null);
const dateStore = useDateStore();
const subscriptionStore = useSubscriptionsStore();

/**
 * Toggle to display month select
 */
const displayMonth: Ref<boolean> = ref(false);
/**
 * Toggle to display year select
 */
const displayYear: Ref<boolean> = ref(false);
// TODO :  lift up to store and disable details when user is on select month or year
const isLoading: Ref<boolean> = ref(false);
const calendarCell: Ref<HTMLElement | null> = ref(null);
const calendarContainer: Ref<HTMLElement | null> = ref(null);
const mainHeight = computed(() => `${calendarHeight}px`);

const { measureContainer, measureCalendar, calendarHeight } =
  useCalendarDimensions();

onMounted(() => {
  nextTick(() => {
    measureContainer(calendarContainer.value);
    measureCalendar(calendarCell.value);
  });
});

const yearChoicesAvailableRange = computed(() => {
  if (yearListComponent.value) {
    const availableYearsRange =
      yearListComponent.value.StartAndEndYearsChoices() ?? false;
    if (availableYearsRange)
      return `
      ${availableYearsRange?.start} - ${availableYearsRange?.end}
   `;
  }
  return false;
});
function isSelectedDay(date: string) {
  return date === subscriptionStore.selectedDate;
}

function handleClickMonth() {
  displayMonth.value = !displayMonth.value;
}
function handleClickYear() {
  displayMonth.value = false;
  displayYear.value = !displayYear.value;
}

enum ACTION_DATE {
  ADD = 1,
  MINUS = -1,
}

function handleSwitchYear(action: ACTION_DATE) {
  const currentDate = dateStore.getCurrentDate;
  const newDate = currentDate.add(action, "year").toISOString();

  // Update current date
  dateStore.setCurrentDate(newDate);
  // Update selected date
  subscriptionStore.setSelectedDate(newDate);
}

/*
 * Triggered when right chevron is clicked
 */
async function handleNextOption() {
  if (displayMonth.value) {
    handleSwitchYear(ACTION_DATE.ADD);
  }
  if (displayYear.value && yearListComponent.value) {
    yearListComponent.value.handleComputeNewYearsChoices(YEAR_ACTION.NEXT);
  }

  if (!displayMonth.value && !displayYear.value) {
    handleNextMonth();
  }
}
async function handleNextMonth() {
  if (subscriptionStore.isModalOpen || isLoading.value) return;
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
/*
 * Triggered when left chevron is clicked
 */
async function handlePrevOption() {
  // Handle logic when months list is displayed
  if (displayMonth.value) {
    return handleSwitchYear(ACTION_DATE.MINUS);
  }
  // Handle logic when years list is displayed
  if (displayYear.value && yearListComponent.value) {
    yearListComponent.value.handleComputeNewYearsChoices(YEAR_ACTION.PREVIOUS);
  } else {
    return handlePrevMonth();
  }
}

async function handlePrevMonth() {
  if (subscriptionStore.isModalOpen || isLoading.value) return;
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

/**
 * Compute new date with the given unit  'month|year|date' and set the date to first
 */
function computeNewDate(currentDate: Dayjs, unit: UnitType, key: number) {
  return currentDate.set(unit, key).set("date", 1).toISOString();
}
/**
 * Update subscription and date store to reload calendar with the given date
 */
async function updateStores(newDate: string) {
  try {
    // Update current date
    dateStore.setCurrentDate(newDate);
    // Update selected date
    subscriptionStore.setSelectedDate(newDate);
    // Fetch subscription of new date
    await subscriptionStore.getSubscriptionsMonthly(newDate);
    // Compute array of days of the new date's month
    dateStore.setDaysInMonth(newDate);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Updates the application date to the first day of the selected year while maintaining the current month
 * @param selectedYear - The selected year
 * @returns Promise<void>
 */
async function handleYearSelection(selectedYear: number) {
  if (selectedYear) {
    try {
      isLoading.value = true;
      const newDate = computeNewDate(
        dateStore.getCurrentDate,
        "year",
        selectedYear,
      );

      await updateStores(newDate);
    } catch (error) {
      console.error("something wrong happened while selecting new year", error);
    } finally {
      displayYear.value = false;
      isLoading.value = false;
    }
  } else {
    console.error("key is missing", selectedYear);
  }
}

async function handleMonthSelection(key: number) {
  // Ignore user input if a new month is selected while one is already selected

  if (key < 12) {
    try {
      isLoading.value = true;
      // Set date to start of month
      const newDate = computeNewDate(dateStore.getCurrentDate, "month", key);

      await updateStores(newDate);
    } catch (error) {
      console.error(
        "something wrong happened while selecting new month",
        error,
      );
    } finally {
      displayMonth.value = false;
      isLoading.value = false;
    }
  } else {
    console.error("undefined month selected  :" + key);
  }
}
// Reset calendar
onMounted(async () => {
  const userCurrentDate = localStorage.getItem("currentDate");
  const currentDate = new Date();
  const dateRef = dayjs(userCurrentDate ?? currentDate).toISOString();
  dateStore.setCurrentDate(dateRef);
  subscriptionStore.setSelectedDate(dateRef);
  await subscriptionStore.getSubscriptionsMonthly(dateRef);
  dateStore.setDaysInMonth(dateRef);
});
</script>
