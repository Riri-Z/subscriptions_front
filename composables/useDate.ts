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

  const arrNameOfDays: Ref<string[]> = ref([
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ]);
  /*

 type return arr of days
  {
    id: number;
    dayValue: number | null;
    currentMonth: boolean;
    date: Dayjs;
  } */
  // This method initialize the day of the month
  const arrOfDays = (
    /* numberDaysInMonth:number , startDayValueOfTheWeek:number,totalCells:number, currentDate:Dayjs  */

    currentDate: Dayjs,
  ) => {
    /*     const totalDays = numberOfDays.value;
    const firstDayOfMonth = startDayName.value;
    const totalCells = 42; // 6 weeks * 7 days */

    const numberDaysInMonth = currentDate.daysInMonth();
    const startDayValueOfTheWeek = currentDate.startOf("month").get("day");
    const totalCells = 42; // 6 weeks * 7 days
    let nextDayValueMonth = 1;
    return new Array(totalCells).fill(null).map((_, index) => {
      const dayValue = index - startDayValueOfTheWeek + 1;
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

      if (dayValue > 0 && dayValue <= numberDaysInMonth) {
        return {
          id: index,
          dayValue,
          currentMonth: true,
          date: dayjs(
            new Date(currentDate.year(), currentDate.month(), dayValue),
          ),
        };
      } else {
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
  };

  const arrNameOfMonth = [
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
    return capitalized(arrNameOfMonth[month]);
  };
  return {
    getDayInMonth,
    arrNameOfDays,
    currentMonthString,
    arrOfDays,
  };
};
