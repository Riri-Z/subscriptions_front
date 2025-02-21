import type { Dayjs } from "dayjs";
import type { Day } from "../day";

export interface DateStore {
  currentDate: string;
  sourceDate: string;
  daysInMonth: Day[] | null;
  loading: boolean;
}

export interface DaysInMonth {
  id: number;
  currentMonth: boolean;
  date: Dayjs;
  dayValue: number | null;
}
