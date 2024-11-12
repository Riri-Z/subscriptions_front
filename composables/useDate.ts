import dayjs, { type Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const useDate = () => {
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

  const arrOfDays: ComputedRef<
    (null | { id: number; dayValue: number | null })[]
  > = computed(() => {
    const totalDays = numberOfDays.value;
    const firstDayOfMonth = startDayName.value;
    const totalCells = 35; // 5 weeks * 7 days
    return new Array(totalCells).fill(null).map((_, index) => {
      const dayValue = index - firstDayOfMonth + 1;
      if (dayValue > 0 && dayValue <= totalDays) {
        return { id: index, dayValue };
      }
      return { id: index, dayValue: null };
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
  };
};
