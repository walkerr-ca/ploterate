import { Footer } from "@/components/nav/footer";
import { Topbar } from "@/components/nav/topbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(info)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative flex flex-col">
      <Topbar />
      <Outlet />
      <Footer />
    </div>
  );
}
