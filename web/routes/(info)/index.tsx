import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(info)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
