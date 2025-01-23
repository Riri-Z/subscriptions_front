import type { Dayjs } from "dayjs";

export interface DateStore {
  currentDate: Dayjs;
  sourceDate: Dayjs;
  daysInMonth: any[] | null;
  loading: boolean;
}
