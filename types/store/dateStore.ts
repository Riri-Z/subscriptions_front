import type { Dayjs } from "dayjs";

export interface DateStore {
  currentDate: Dayjs;
  sourceDate: Dayjs;
  daysInMonth: DaysInMonth[] | null;
  loading: boolean;
}

export interface DaysInMonth {
  id: number;
  currentMonth: boolean
  date: Dayjs;
  dayValue: number;
}

