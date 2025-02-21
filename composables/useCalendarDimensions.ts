const containerHeight = ref<number>(0);
const calendarHeight = ref<number>(0);
const headerHeight = ref<number>(0);
export const useCalendarDimensions = () => {

  const setContainerHeight = (height: number) => {
    containerHeight.value = height;
  };

  const setCalendarHeight = (height: number) => {
    calendarHeight.value = height;
  };
  const setHeaderheight = (height: number) => {
    headerHeight.value = height;
  };

  const measureContainer = (el: HTMLElement | null) => {
    if (el) {
      setContainerHeight(el.offsetHeight);
    }
  };
  const measureCalendar = (el: HTMLElement | null) => {
    if (el) {
      setCalendarHeight(el.offsetHeight);
    }
  };
  const measureHeader = (el: HTMLElement | null) => {
    if (el) {
      setHeaderheight(el.offsetHeight);
    }
  };

  return {
    containerHeight,
    calendarHeight,
    headerHeight,
    measureContainer,
    measureCalendar,
    measureHeader,
  };
};
