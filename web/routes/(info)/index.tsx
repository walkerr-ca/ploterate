import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookMarked,
  Eye,
  Library,
  Search,
  Star,
} from "lucide-react";

import LandingWave from "@/assets/art/landing-wave.svg";
import LandingWave2 from "@/assets/art/landing-wave-2.svg";
import LandingBrowser from "@/assets/art/landing-browser.png";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/(info)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <main className="relative w-screen h-screen flex flex-col justify-center items-center text-center gap-6 pt-17.5 px-8 md:px-16 lg:px-32 xl:px-80">
        <img
          draggable={false}
          src={LandingWave}
          className="absolute w-screen h-fit bottom-0 object-contain"
        />
        <h1 className="text-6xl font-extrabold">
          Iterative collaborative writing{" "}
          <span className="text-primary">for storytellers</span>
        </h1>
        <p className="text-md text-muted-foreground mb-4">
          The go-to platform for <u>building worlds and sharing stories</u>.
        </p>
        <Button className="z-1" asChild>
          <Link to="/auth/register">
            Get Started
            <ArrowRight />
          </Link>
        </Button>
      </main>
      <section className="w-screen bg-primary grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 pt-8 pb-12 px-8 md:px-16">
        <div className="w-full flex flex-col justify-center items-center text-center gap-1">
          <h3 className="text-primary-foreground text-4xl xl:text-5xl font-extrabold">
            133,464
          </h3>
          <p className="text-primary-foreground text-sm lg:text-md">
            Public Stories
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center text-center gap-1">
          <h3 className="flex flex-row justify-center items-center gap-2 text-primary-foreground text-4xl xl:text-5xl font-extrabold">
            <Star className="fill-primary-foreground size-6 xl:size-10" /> 4.1 /
            5
          </h3>
          <p className="text-primary-foreground text-sm lg:text-md">
            Average Rating
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center text-center gap-1">
          <h3 className="flex flex-row justify-center items-center gap-2 text-primary-foreground text-4xl xl:text-5xl font-extrabold">
            89,354{" "}
            <Library className="fill-primary-foreground size-8 xl:size-10" />
          </h3>
          <p className="text-primary-foreground text-sm lg:text-md">
            Active Creators
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center text-center gap-1">
          <h3 className="text-primary-foreground text-4xl xl:text-5xl font-extrabold">
            46.11M
          </h3>
          <p className="text-primary-foreground text-sm lg:text-md">
            Monthly Reads
          </p>
        </div>
      </section>
      <img
        draggable={false}
        src={LandingWave2}
        className="w-screen h-fit rotate-180 object-contain"
      />
      <section className="w-screen grid grid-cols-1 md:grid-cols-6 gap-8 p-16 md:px-24 lg:px-36 xl:px-48 md:pb-8">
        <img
          draggable={false}
          src={LandingBrowser}
          className="w-full md:col-span-4"
        />
        <div className="w-full md:col-span-2 h-full flex flex-col justify-center items-center md:items-start text-center md:text-start gap-4">
          <h2 className="text-5xl lg:text-6xl font-extrabold">
            Browse hundreds of stories
          </h2>
          <p className="text-muted-foreground text-sm mt-4">
            Stories are ideas, characters, and plots that people share. Other
            users can write their interpretion of these stories!
          </p>
          <Button className="w-fit" asChild>
            <Link to="/auth/login">
              <Search />
              Search Now
            </Link>
          </Button>
        </div>
      </section>
      <section className="w-screen flex flex-col-reverse md:grid md:grid-cols-6 gap-8 p-16 md:px-24 lg:px-36 xl:px-48 md:pt-0">
        <div className="w-full md:col-span-2 h-full flex flex-col justify-center items-center md:items-end text-center md:text-end gap-4">
          <h2 className="text-5xl lg:text-6xl font-extrabold">
            Write the perfect story
          </h2>
          <p className="text-muted-foreground text-sm mt-4">
            Find a story you like? Begin writing your own version of it! Bring
            the idea to life with limitless creative tooling on Ploterate.
          </p>
          <Button className="w-fit" asChild>
            <Link to="/auth/login">
              <BookMarked />
              Start Writing
            </Link>
          </Button>
        </div>
        <img
          draggable={false}
          src={LandingBrowser}
          className="w-full md:col-span-4"
        />
      </section>
      <section id="popular" className="w-screen flex flex-col gap-8 p-16">
        <h3 className="text-4xl font-extrabold">Trending Stories</h3>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link to="/">
            <Card>
              <CardHeader>
                <CardTitle>Story Title</CardTitle>
                <CardDescription className="flex flex-row items-center gap-2">
                  <Eye className="size-4" /> 40,234 views
                </CardDescription>
              </CardHeader>
              <p className="w-full text-sm px-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                consectetur, nisl vel aliquam aliquet, nisl nisl aliquet nisl,
                vel aliquam nisl nisl vel aliquam.
              </p>
              <CardFooter className="justify-end">
                <Button variant="link">
                  Read More
                  <ArrowRight />
                </Button>
              </CardFooter>
            </Card>
          </Link>
          <Link to="/">
            <Card>
              <CardHeader>
                <CardTitle>Story Title</CardTitle>
                <CardDescription className="flex flex-row items-center gap-2">
                  <Eye className="size-4" /> 40,234 views
                </CardDescription>
              </CardHeader>
              <p className="w-full text-sm px-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                consectetur, nisl vel aliquam aliquet, nisl nisl aliquet nisl,
                vel aliquam nisl nisl vel aliquam.
              </p>
              <CardFooter className="justify-end">
                <Button variant="link">
                  Read More
                  <ArrowRight />
                </Button>
              </CardFooter>
            </Card>
          </Link>
          <Link to="/">
            <Card>
              <CardHeader>
                <CardTitle>Story Title</CardTitle>
                <CardDescription className="flex flex-row items-center gap-2">
                  <Eye className="size-4" /> 40,234 views
                </CardDescription>
              </CardHeader>
              <p className="w-full text-sm px-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                consectetur, nisl vel aliquam aliquet, nisl nisl aliquet nisl,
                vel aliquam nisl nisl vel aliquam.
              </p>
              <CardFooter className="justify-end">
                <Button variant="link">
                  Read More
                  <ArrowRight />
                </Button>
              </CardFooter>
            </Card>
          </Link>
          <Link to="/">
            <Card>
              <CardHeader>
                <CardTitle>Story Title</CardTitle>
                <CardDescription className="flex flex-row items-center gap-2">
                  <Eye className="size-4" /> 40,234 views
                </CardDescription>
              </CardHeader>
              <p className="w-full text-sm px-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                consectetur, nisl vel aliquam aliquet, nisl nisl aliquet nisl,
                vel aliquam nisl nisl vel aliquam.
              </p>
              <CardFooter className="justify-end">
                <Button variant="link">
                  Read More
                  <ArrowRight />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </section>
    </>
  );
}
