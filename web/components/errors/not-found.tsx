import { useRouter } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import NotFoundArt from "@/assets/art/not-found.svg";

export const NotFound = () => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-center gap-4">
      <img src={NotFoundArt} className="max-h-64 object-fill px-16" />
      <div className="w-1/2 flex flex-col justify-center items-center mt-4">
        <h1 className="text-4xl font-extrabold">Not Found</h1>
        <p className="text-muted-foreground">
          The page you're looking for could not be loaded.
        </p>
      </div>
      <Button
        onClick={() => {
          router.history.back();
        }}
      >
        <ArrowLeft />
        Go Back
      </Button>
    </div>
  );
};
