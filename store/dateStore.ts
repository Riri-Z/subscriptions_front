import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useDate } from "~/composables/useDate";
import type { DateStore } from "~/types/store/dateStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
const subscriptionStore = useSubscriptionsStore();

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
    getCurrentDate: (state) => state.currentDate,
  },
  actions: {
    async setPreviousMonth() {
      this.currentDate = this.currentDate.subtract(1, "month");
      const res = await subscriptionStore.getSubscriptionsMonthly(
        this.currentDate.set("date", 1).format("YYYY-MM-DD"),
      );
      this.setDaysInMonth(this.currentDate);
      return res;
    },
    async setNextMonth() {
      this.currentDate = this.currentDate.add(1, "month");
      subscriptionStore.setSelectedDate(this.currentDate);
      const res = await subscriptionStore.getSubscriptionsMonthly(
        this.currentDate.set("date", 1).format("YYYY-MM-DD"),
      );
      this.setDaysInMonth(this.currentDate);
      return res;
    },
    setDaysInMonth(date: Dayjs) {
      this.daysInMonth = useDate().arrOfDays(date);
    },
    setCurrentDate(date: Dayjs) {
      this.currentDate = date;
    },
    setSourceDate(date: Dayjs) {
      this.sourceDate = date;
    },
  },
});
