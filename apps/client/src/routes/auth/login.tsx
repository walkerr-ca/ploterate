import { createFileRoute } from "@tanstack/react-router";

import Scatter from "@/assets/backgrounds/login-scatter.svg";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  return (
    <div className="w-full h-full grid xl:grid-cols-2 gap-4 py-16 items-center">
      <div className="relative w-full h-full hidden xl:flex bg-primary/90 rounded-r-4xl">
        <img
          src={Scatter}
          draggable={false}
          className="absolute w-full object-cover opacity-5"
        />
        <div className="w-full h-full p-16">
          <h1 className="text-primary-foreground text-6xl font-extrabold tracking-light">
            Ploterate
          </h1>
        </div>
      </div>
      <div className="w-full h-fit flex flex-col gap-4"></div>
    </div>
  );
}
