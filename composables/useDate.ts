import dayjs, { type Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import dayOfYear from "dayjs/plugin/dayOfYear";
import type { Day } from "~/types/day";
dayjs.extend(utc);
dayjs.extend(dayOfYear);

export const useDate = () => {
  const getDayInMonth = (date: string) => {
    return dayjs(date).date();
  };

  const NAME_DAYS: Ref<string[]> = ref([
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ]);

  // This method initialize the days of the month
  /**
   * Initialize the day of the month
   * @param currentDate  Dayjs
   * @returns Day[]
   */
  function arrOfDays(currentDate: Dayjs): Day[] {
    const numberDaysInMonth = currentDate.daysInMonth();
    const startDayValueOfTheWeek = currentDate.startOf("month").get("day"); //eg : 0 for sunday, 1 for monday
    const totalDays = 42; // 6 weeks * 7 days
    let nextDayValueMonth = 1;
    return new Array(totalDays).fill(null).map((_, index) => {
      const dayValue = index - startDayValueOfTheWeek + 1;
      // Compute date day for previous month
      if (dayValue < 1) {
        const previousMonth = currentDate.subtract(1, "month");
        const numberOfDaysInPreviousMonth = previousMonth.daysInMonth();

        return {
          id: index,
          dayValue: numberOfDaysInPreviousMonth + dayValue,
          currentMonth: false,
          date: dayjs(
            new Date(
              previousMonth.year(),
              previousMonth.month(),
              numberOfDaysInPreviousMonth + dayValue,
            ),
          ).toISOString(),
        };
      }
      // Compute date day for current month
      else if (dayValue > 0 && dayValue <= numberDaysInMonth) {
        return {
          id: index,
          dayValue,
          currentMonth: true,
          date: dayjs(
            new Date(currentDate.year(), currentDate.month(), dayValue),
          ).toISOString(),
        };
      } else {
        // Compute date day for next month

        const result = {
          id: index,
          dayValue: nextDayValueMonth,
          currentMonth: false,
          date: dayjs(
            new Date(currentDate.year(), currentDate.month(), dayValue),
          ).toISOString(),
        };
        nextDayValueMonth = nextDayValueMonth + 1;
        return result;
      }
    });
  }

  const MONTH_NAME = [
    //Months are zero indexed, so January is month 0.
    { key: 0, value: "janvier" },
    { key: 1, value: "février" },
    { key: 2, value: "mars" },
    { key: 3, value: "avril" },
    { key: 4, value: "mai" },
    { key: 5, value: "juin" },
    { key: 6, value: "juillet" },
    { key: 7, value: "août" },
    { key: 8, value: "septembre" },
    { key: 9, value: "octobre" },
    { key: 10, value: "novembre" },
    { key: 11, value: "décembre" },
  ];

  const currentMonthString = (month: number) => {
    return capitalized(MONTH_NAME[month].value);
  };
  return {
    getDayInMonth,
    NAME_DAYS,
    MONTH_NAME,
    currentMonthString,
    arrOfDays,
  };
};
