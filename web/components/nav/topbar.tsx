import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

import Icon from "@/assets/branding/icon_black.svg";

export const Topbar = () => {
  return (
    <div className="w-full flex flex-row justify-between items-center p-4 border-b">
      <div className="w-fit flex flex-row items-center gap-4">
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
      <div className="w-fit flex justify-end flex-row items-center gap-4">
        <Button variant="link" className="text-foreground" asChild>
          <Link to="/auth/register">Login</Link>
        </Button>
        <Button asChild>
          <Link to="/auth/register">Join for Free</Link>
        </Button>
      </div>
    </div>
  );
};
