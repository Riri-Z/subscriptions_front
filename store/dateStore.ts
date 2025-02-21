import type { Day } from "~/types/day";
import { defineStore } from "pinia";
import dayjs from "dayjs";
import { useDate } from "~/composables/useDate";
import type { DateStore } from "~/types/store/dateStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
export const useDateStore = defineStore("date", {
  state: (): DateStore => ({
    // Stocker les dates en ISO string
    currentDate: dayjs(new Date()).toISOString(),
    sourceDate: dayjs(new Date())
      .set("date", 1)
      .set("hour", 0)
      .set("minute", 0)
      .set("second", 0)
      .set("millisecond", 0)
      .toISOString(),
    daysInMonth: [] as Day[],
    loading: false,
  }),
  getters: {
    // Convertir en dayjs pour les manipulations
    getStartOfMonth: (state) => dayjs(state.currentDate).startOf("month"),
    getCurrentMonth: (state) => dayjs(state.currentDate).get("month"),
    getCurrentMonthString: (state) =>
      useDate().currentMonthString(dayjs(state.currentDate).get("month")),
    getCurrentMonthYearStringified: (state) =>
      dayjs(state.currentDate).format("MMMM, YYYY"),
    getStartDayOfMonth: (state) => dayjs(state.currentDate).set("date", 1),
    getCurrentYear: (state) => dayjs(state.currentDate).get("year"),
    getNumberOfDays: (state) => dayjs(state.currentDate).date(),
    getDayInMonth: (state) => dayjs(state.currentDate).get("date"),
    getCurrentDate: (state) => dayjs(state.currentDate),
  },
  actions: {
    async setPreviousMonth() {
      const subscriptionStore = useSubscriptionsStore();

      const newDate = dayjs(this.currentDate).subtract(1, "month");
      this.currentDate = newDate.toISOString();

      const res = await subscriptionStore.getSubscriptionsMonthly(
        newDate.set("date", 1).format("YYYY-MM-DD"),
      );
      this.setDaysInMonth(newDate.toISOString());
      return res;
    },
    async setNextMonth() {
      const subscriptionStore = useSubscriptionsStore();

      const newDate = dayjs(this.currentDate).add(1, "month");
      this.currentDate = newDate.toISOString();

      subscriptionStore.setSelectedDate(newDate.toISOString());
      const res = await subscriptionStore.getSubscriptionsMonthly(
        newDate.set("date", 1).format("YYYY-MM-DD"),
      );
      this.setDaysInMonth(newDate.toISOString());
      return res;
    },
    setDaysInMonth(date: string) {
      this.daysInMonth = useDate().arrOfDays(dayjs(date));
    },
    setCurrentDate(date: string) {
      this.currentDate = date;
    },
    setSourceDate(date: string) {
      this.sourceDate = date;
    },
  },
});