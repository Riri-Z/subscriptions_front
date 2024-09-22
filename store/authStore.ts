import type {
  LoginResponse,
  Register,
  RegisterResponse,
} from "~/interfaces/auth.interface";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    jwtToken: null,
  }),

  getters: {},
  actions: {
    async loginUser(username: string, password: string) {
      try {
        const { data: jwt } = await useAPI<LoginResponse>(() => "/auth/login", {
          method: "POST",
          body: {
            username,
            password,
          },
        });

        if (jwt.value?.body?.access_token) {
          localStorage.setItem("jwt", jwt.value?.body?.access_token);
          navigateTo("/dashboard");
        }
      } catch (e) {
        // TODO : think of how to handle fail  POST
        console.error("error loginUser", e);
      }
    },
    async registerUser(formRegister: Register) {
      const { name, username, password, email } = formRegister;
      //TODO: Need to remove this,  it's should not be mandotory
      const roles = ["USER"];

      const { data: user, error } = await useAPI<RegisterResponse>(
        () => "/users",
        {
          method: "POST",
          body: {
            name,
            username,
            password,
            email,
            roles,
          },
        },
      );
      //display toast or anything to say to login with the newly created account at /login
      if (user.value?.id) {
        navigateTo("/login");
      }
      if (error) {
        console.error("error", error);
      }
    },
  },
});
