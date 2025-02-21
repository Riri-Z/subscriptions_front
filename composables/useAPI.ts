import type { FetchOptions } from 'ofetch';

export function useAPI<T>(
  url: string,
  options?: FetchOptions
): Promise<T> | null {
  const { $api } = useNuxtApp();
  const { token } = useAuth();
  const route = useRoute();

  if (!token?.value && route.path !== "/register") {
    throw new Error("Unauthorized");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token?.value) {
    headers.Authorization = token.value;
  }

  return $api<T>(url, {
    ...options,
    headers,
  });
}
