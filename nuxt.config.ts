// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  components: [
    {
      path: "~/components",
    },
  ],
  devtools: { enabled: true },
  sourcemap: {
    server: true,
    client: true,
  },
  css: ["~/assets/styles/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@nuxt/image",
    "@sidebase/nuxt-auth",
    "nuxt-auth-utils",
    "@nuxtjs/device", // TODO : check if we still need it
  ],

  auth: {
    isEnabled: true,
    //guard protecting auth routes
    globalAppMiddleware: false,
    baseURL: process.env.NUXT_PUBLIC_API_BASE + "/auth/",

    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "login", method: "post" },
        signOut: { path: "logout", method: "post" },
        signUp: { path: "register", method: "post" },
        getSession: { path: "session", method: "get" },
      },
      token: {
        signInResponseTokenPointer: "/accessToken",
        type: "Bearer",
        cookieName: "accessToken",
        headerName: "Authorization",
        sameSiteAttribute: "lax",
        maxAgeInSeconds: 15,
        secureCookieAttribute: false,
        httpOnlyCookieAttribute: false,
      },
      refresh: {
        isEnabled: true,
        endpoint: { path: "refresh", method: "post" },
        refreshOnlyToken: false,

        token: {
          signInResponseRefreshTokenPointer: "/refreshToken",
          refreshRequestTokenPointer: "/refreshToken",
          cookieName: "refreshToken",
          maxAgeInSeconds: 10555,
          sameSiteAttribute: "lax",
          secureCookieAttribute: false,
          httpOnlyCookieAttribute: false,
        },
      },
      pages: {
        login: "/login",
      },
    },
  },
});
