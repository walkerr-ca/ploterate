import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

const RootLayout = () => (
  <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <div className="w-screen h-screen overflow-x-hidden overflow-y-auto">
          <Outlet />
        </div>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
