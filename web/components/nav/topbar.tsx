import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

import Icon from "@/assets/branding/icon_black.svg";

export const Topbar = () => {
  return (
    <div className="absolute w-full flex flex-row justify-between items-center p-4 bg-background border-b z-10">
      <div className="hidden w-fit lg:flex flex-row items-center gap-4">
        <Link to="/">
          <img src={Icon} className="object-fill h-9" />
        </Link>
        <Button variant="link" className="text-foreground" asChild>
          <Link to="/about">About</Link>
        </Button>
        <Button variant="link" className="text-foreground" asChild>
          <Link to="/about">Popular</Link>
        </Button>
        <Button variant="link" className="text-foreground" asChild>
          <Link to="/about">Browse</Link>
        </Button>
        <Button variant="link" className="text-foreground" asChild>
          <Link to="/about">Search</Link>
        </Button>
      </div>
      <div className="hidden w-fit lg:flex justify-end flex-row items-center gap-4">
        <Button variant="link" className="text-foreground" asChild>
          <Link to="/auth/register">Login</Link>
        </Button>
        <Button asChild>
          <Link to="/auth/register">Join for Free</Link>
        </Button>
      </div>

      <div className="lg:hidden w-fit flex flex-row items-center gap-4">
        <Link to="/">
          <img src={Icon} className="object-fill h-9" />
        </Link>
      </div>
      <div className="lg:hidden w-fit flex justify-end flex-row items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Ploterate</SheetTitle>
              <SheetDescription>
                The go-to platform for building worlds and sharing stories.
              </SheetDescription>
              <div></div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
