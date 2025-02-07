import { defineStore } from "pinia";
import type { ApiResponse, UserStore } from "~/types/store/userStore";

export const useUserStore = defineStore("user", {
  // store options
  state: () => ({
    user: null as UserStore | null,
    loading: false,
    error: false,
  }),
  getters: {
    getUserName: (state): string | undefined => state.user?.username,
    getUserEmail: (state): string | undefined => state.user?.email,
    getUserId: (state): number | undefined => state.user?.id,
    getUser: (state): UserStore | null => state.user,
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async getUserInformation(id: string) {
      try {
        this.loading = true;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + " " + "JWT",
          },
        };
        const { data, error } = await useFetch<ApiResponse>(
          "http://localhost:8080/auth/user/" + id,
          {
            method: "GET",
            headers: options.headers,
          },
        );
        if (error) {
          throw new Error("error fetching user information");
        }
        if (data?.value?.result) {
          const user: UserStore | null = data?.value?.result
            ? data.value.result
            : null;
          this.user = user;
        } else {
          throw new Error("data has no value : " + JSON.stringify(data));
        }
      } catch (e) {
        console.error(e);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },
});
