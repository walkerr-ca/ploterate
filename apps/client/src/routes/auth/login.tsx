import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  return (
    <div className="w-full h-full grid xl:grid-cols-2 gap-4 items-center">
      <div className="w-full h-full hidden xl:flex bg-primary rounded-r-xl"></div>
      <div className="w-full h-fit flex flex-col gap-4"></div>
    </div>
  );
}
