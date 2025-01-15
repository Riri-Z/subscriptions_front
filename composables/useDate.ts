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
  const sourceDate: Ref<Dayjs> = ref(dayjs(new Date()).set("date", 1));
  const currentMonth: ComputedRef<number> = computed(() =>
    sourceDate.value.get("month"),
  );
  const currentYear: ComputedRef<number> = computed(() => {
    return sourceDate.value.get("year");
  });
  const numberOfDays: ComputedRef<number> = computed(() => {
    return sourceDate.value.daysInMonth();
  });
  const startDayName: ComputedRef<number> = computed(() => {
    return sourceDate.value.startOf("month").get("day");
  });

  const startDayOftheMonth: ComputedRef<string> = computed(() => {
    return sourceDate.value.format("YYYY-MM-DD");
  });
  const handlePreviousMonth = (): void => {
    sourceDate.value = sourceDate.value.subtract(1, "month");
  };
  const handleNextMonth = (): void => {
    sourceDate.value = sourceDate.value.add(1, "month");
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

  // This method initialize the day of the month
  const arrOfDays: ComputedRef<
    {
      id: number;
      dayValue: number | null;
      currentMonth: boolean;
      date: Dayjs;
    }[]
  > = computed(() => {
    const totalDays = numberOfDays.value;
    const firstDayOfMonth = startDayName.value;
    const totalCells = 42; // 6 weeks * 7 days
    let nextDayValueMonth = 1;
    return new Array(totalCells).fill(null).map((_, index) => {
      const dayValue = index - firstDayOfMonth + 1;
      if (dayValue < 1) {
        const previousMonth = sourceDate.value.subtract(1, "month");
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

      if (dayValue > 0 && dayValue <= totalDays) {
        return {
          id: index,
          dayValue,
          currentMonth: true,
          date: dayjs(
            new Date(
              sourceDate.value.year(),
              sourceDate.value.month(),
              dayValue,
            ),
          ),
        };
      } else {
        const result = {
          id: index,
          dayValue: nextDayValueMonth,
          currentMonth: false,
          date: dayjs(
            new Date(
              sourceDate.value.year(),
              sourceDate.value.month(),
              dayValue,
            ),
          ),
        };
        nextDayValueMonth = nextDayValueMonth + 1;
        return result;
      }
    });
  });

  const arrNameOfMonth: Ref<string[]> = ref([
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
  ]);

  const currentMonthString: ComputedRef<string> = computed(() => {
    return capitalized(arrNameOfMonth.value[currentMonth.value]);
  });
  return {
    handlePreviousMonth,
    handleNextMonth,
    currentYear,
    currentMonth,
    currentMonthString,
    arrNameOfDays,
    arrOfDays,
    startDayOftheMonth,
    sourceDate,
    getDayInMonth,
  };
};
