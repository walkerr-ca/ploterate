import { Topbar } from "@/components/nav/topbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(info)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col">
      <Topbar />
      <Outlet />
    </div>
  );
}
