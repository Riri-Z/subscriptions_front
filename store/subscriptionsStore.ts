import type { Dayjs } from "dayjs";
import { defineStore } from "pinia";
import type {
  ApiResponse,
  PostSubscriptions,
  Subscription,
  SubscriptionsStore,
} from "~/types/store/subscriptionsStore";

export const useSubscriptionsStore = defineStore("subscriptions", {
  state: (): SubscriptionsStore => ({
    isModalOpen: false,
    isOpenDetails: false,
    subscriptions: null as Subscription[] | null,
    subscriptionsCurrentMonth: null as Subscription[] | null,
    loading: false,
    error: false,
    selectedDate: null,
  }),
  getters: {},
  actions: {
    openDetails() {
      this.isOpenDetails = true;
    },
    closeDetails() {
      this.isOpenDetails = false;
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    setSelectedDate(date: Dayjs) {
      this.selectedDate = date.format("DD-MM-YYYY");
    },
    async postUserSubscriptions(formData: PostSubscriptions) {},
    async getAllSubscriptions() {
      this.loading = true;
      this.error = false;
      try {
        const subscriptions = await useAPI<ApiResponse>("/user-subscriptions", {
          method: "GET",
        });
      } catch (error) {
        this.error = true;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getSubscriptionsMonthly(date: Date | string) {
      this.loading = true;
      this.error = false;
      const url = "/user-subscriptions/" + date;
      try {
        const subscriptionsCurrentMonth = await useAPI<Subscription[]>(url, {
          method: "GET",
        });
        if (subscriptionsCurrentMonth) {
          this.subscriptionsCurrentMonth = subscriptionsCurrentMonth;
        }
      } catch (error) {
        this.subscriptionsCurrentMonth = [];
        this.error = true;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
