import dayjs, { Dayjs } from "dayjs";
import { useDate } from "~/composables/useDate";
import type { DateStore } from "~/types/store/dateStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
const subscriptionStore = useSubscriptionsStore();

// Total cell in the calendar
const numberOfDays = 42;

export const useDateStore = defineStore("date", {
  state: (): DateStore => ({
    currentDate: dayjs(new Date()),
    sourceDate: dayjs(new Date())
      .set("date", 1)
      .set("hour", 0)
      .set("minute", 0)
      .set("second", 0)
      .set("millisecond", 0),
    daysInMonth: null, // 6 weeks * 7 days
    loading: false,
  }),
  getters: {
    getStartOfMonth: (state) => state.currentDate.startOf("month"),
    getCurrentMonth: (state) => state.currentDate.get("month"),
    getCurrentMonthString: (state) =>
      useDate().currentMonthString(state.currentDate.get("month")),
    getCurrentMonthYearStringified: (state) =>
      state.currentDate.format("MMMM, YYYY"),
    getStartDayOfMonth: (state) => state.currentDate.set("date", 1),
    getCurrentYear: (state) => state.currentDate.get("year"),
    getNumberOfDays: (state) => state.currentDate.date(),
    getDayInMonth: (state) => state.currentDate.get("date"),
  },
  actions: {
    async setPreviousMonth() {
      this.currentDate = this.currentDate.subtract(1, "month");
      await subscriptionStore.getSubscriptionsMonthly(
        this.currentDate.set("date", 1).format("YYYY-MM-DD"),
      );
      this.setDaysInMonth(this.currentDate);
    },
    async setNextMonth() {
      this.currentDate = this.currentDate.add(1, "month");
      subscriptionStore.setSelectedDate(this.currentDate);
      await subscriptionStore.getSubscriptionsMonthly(
        this.currentDate.set("date", 1).format("YYYY-MM-DD"),
      );
      this.setDaysInMonth(this.currentDate);
    },
    setDaysInMonth(date: Dayjs) {
      this.daysInMonth = useDate().arrOfDays(date);
    },
    setCurrentDate(date: Dayjs) {
      this.currentDate = date;
    },
  },
});
