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
    subscriptions: null as Subscription[] | null,
    subscriptionsCurrentMonth: null as Subscription[] | null,
    loading: false,
    error: false,
    selectedDate: null,
  }),
  getters: {},
  actions: {
    openModal() {
      console.log("this.isModalOpen", this.isModalOpen);
      this.isModalOpen = true;
      console.log("this.isModalOpen after update", this.isModalOpen);
    },
    closeModal() {
      this.isModalOpen = false;
    },
    setSelectedDate(date: string) {
      this.selectedDate = date;
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
        const subscriptionsCurrentMonth = await useAPI<ApiResponse>(url, {
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
