import type { UseFetchOptions } from "#app";
const { $api } = useNuxtApp();
export function useAPI<T>(
  url: string,
  options?: UseFetchOptions<T> & { method?: string },
): Promise<T> | null {
  const { token } = useAuth();

  if (!token?.value) {
    return null;
  }

  return $api(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token.value,
    },
  });
}
