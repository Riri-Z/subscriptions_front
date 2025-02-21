import { defineStore } from "pinia";
import { useAPI } from "~/composables/useAPI";
import type { RegisterResponse } from "~/interfaces/auth.interface";
import type { ApiResponse } from "~/types/store/subscriptionsStore";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthentified: false,
  }),

  getters: {},
  actions: {
    async registerUser(username: string, password: string, email: string) {
      //TODO: Need to remove this,  it's should not be mandotory
      const roles = ["USER"];
      try {
        const res: ApiResponse<RegisterResponse> | null = await useAPI(
          "/users",
          {
            method: "post",
            body: {
              username,
              password,
              email,
              roles,
            },
          },
        );
        return res?.statusCode;
      } catch (error) {
        console.error("error while sign up :", error);
        throw error;
      }
    },
  },
});
