import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <main className="w-screen h-screen overflow-x-hidden overflow-y-auto scroll-smooth">
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Toaster />
      </QueryClientProvider>
      <TanStackRouterDevtools />
    </main>
  ),
});
