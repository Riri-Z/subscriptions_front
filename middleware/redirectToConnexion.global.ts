export default defineNuxtRouteMiddleware((to, _) => {
  if (to.path === "/") {
    return navigateTo("/login");
  }
  // For now, there is no dedicated content at the /dashboard route, so we automatically redirect users to /dashboard/calendar.
  if (to.path === "/dashboard/") {
    return navigateTo("/dashboard/calendar");
  }
});
