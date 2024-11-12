import type { UseFetchOptions } from "#app";
const { $api } = useNuxtApp();
export function useAPI<T>(
  url: string,
  options?: UseFetchOptions<T> & {},
): Promise<T> | null {
  const { token } = useAuth();
  const route = useRoute();
  if (!token?.value && route.path !== "/register") {
    return null;
  }

  return $api(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token.value,
    },
  });
}
