import type { AppRouter } from "@latin-practice/api/src/routes/routes.ts";
import { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { LOCAL_STORAGE_KEYS } from "./localstorage.ts";

export const queryClient = new QueryClient();

const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_SERVER_URL + "/api",
      headers() {
        return {
          Authorization:
            localStorage.getItem(LOCAL_STORAGE_KEYS.api_token) ?
              `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.api_token)}`
            : "",
        };
      },
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});
