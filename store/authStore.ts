import type {
  LoginResponse,
  RegisterResponse,
} from "~/interfaces/auth.interface";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthentified: false,
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
        const jwtToken = jwt.value?.body?.access_token;

        if (jwtToken) {
          this.isAuthentified = true;
          localStorage.setItem("jwt", jwtToken);
          // decode JwtToken to extract user id, >>zamor |33
          // pass it to navigateTo ,
          // on init load userInfo with id
          navigateTo("/dashboard");
        }
      } catch (e) {
        this.isAuthentified = false;

        // TODO : think of how to handle fail  POST
        console.error("error loginUser", e);
      }
    },
    async registerUser(
      name: string,
      username: string,
      password: string,
      email: string,
    ) {
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

      console.log(user);
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
