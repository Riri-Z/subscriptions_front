import type { UseFetchOptions } from "#app";
const { $api } = useNuxtApp();
export function useAPI<T>(
  url: string,
  options?: UseFetchOptions<T> & {},
): Promise<T> | null {
  const { token } = useAuth();
  console.log("optiions", options);

  if (!token?.value) {
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
