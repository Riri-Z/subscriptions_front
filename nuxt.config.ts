// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  sourcemap: {
    server: true,
    client: true,
  },
  /*   devtools: { enabled: false }, */
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
  ],
  auth: {
    //guard protecting auth routes
    globalAppMiddleware: true,
    baseURL: process.env.NUXT_PUBLIC_API_BASE + "/auth/",
    provider: {
      type: "local",
      // Redirect user to this page when he's not connected
      pages: {
        login: "/login",
      },
      endpoints: {
        signIn: { path: "login", method: "post" },
        signOut: { path: "logout", method: "post" },
        getSession: { path: "session", method: "post" },
      },
      token: {
        // get jwt from response when login
        signInResponseTokenPointer: "/body/access_token",
        type: "Bearer",
        //  cookieName: 'auth.token',
        headerName: "Authorization",
        maxAgeInSeconds: 1800, // .env
        sameSiteAttribute: "lax",
        cookieDomain: "",
        secureCookieAttribute: false,
        httpOnlyCookieAttribute: false,
      },
    },
  },
});
