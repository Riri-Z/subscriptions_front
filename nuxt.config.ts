// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  sourcemap: {
    server: true,
    client: true,
  },
  image: {
    provider: 'static',
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
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "@nuxt/image",
    "@sidebase/nuxt-auth",
    "nuxt-auth-utils",
    "@nuxtjs/device", // TODO : check if we still need it
  ],
  auth: {
    isEnabled: true,
    //guard protecting auth routes
    globalAppMiddleware: true,
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
        maxAgeInSeconds: 1800,
        sameSiteAttribute: "lax",
        secureCookieAttribute: false,
        httpOnlyCookieAttribute: true,
      },
      refresh: {
        isEnabled: false,
        endpoint: { path: "/refresh", method: "post" },
        refreshOnlyToken: true,
        token: {
          signInResponseRefreshTokenPointer: "/refreshToken",
          refreshRequestTokenPointer: "/refreshToken",
          cookieName: "refreshToken",
          maxAgeInSeconds: 1800,
          sameSiteAttribute: "lax",
          secureCookieAttribute: false,
          httpOnlyCookieAttribute: true,
        },
      },
      pages: {
        login: "/login",
      },
    },
  },
});
