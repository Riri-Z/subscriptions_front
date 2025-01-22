import dayjs, { type Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import dayOfYear from "dayjs/plugin/dayOfYear";
/* TODO : move this to store , allow store to handle it. ONE SOURCE OF TRUTH */
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

  type Day = {
    id: number;
    dayValue: number | null;
    currentMonth: boolean;
    date: Dayjs;
  };
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
          ),
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
          ),
        };
      } else {
        // Compute date day for next month

        const result = {
          id: index,
          dayValue: nextDayValueMonth,
          currentMonth: false,
          date: dayjs(
            new Date(currentDate.year(), currentDate.month(), dayValue),
          ),
        };
        nextDayValueMonth = nextDayValueMonth + 1;
        return result;
      }
    });
  }

  const MONTH_NAME = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const currentMonthString = (month: number) => {
    return capitalized(MONTH_NAME[month]);
  };
  return {
    getDayInMonth,
    NAME_DAYS,
    MONTH_NAME,
    currentMonthString,
    arrOfDays,
  };
};
