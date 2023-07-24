import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  return (
    <div
      id="slider"
      className="scrollbar-hidden relative h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth"
    >
      <div className="sticky top-0 z-10 flex justify-end">
        <div className="absolute m-2 flex items-center justify-center gap-2 align-middle">
          <ThemeToggle />
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "blurry-background m-2"
            )}
          >
            Login
          </Link>
        </div>
      </div>
      <section className="h-screen snap-start bg-gradient-to-b from-indigo-500 ">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <p className="mb-7 text-6xl font-bold">
              Game
              <span className="bg-gradient-to-t from-indigo-500 to-black bg-clip-text text-transparent dark:to-white">
                flix
              </span>
            </p>
            <h2 className="text-center text-2xl font-medium">
              A place to keep track of your games and discover new ones
            </h2>

            <div className="mt-4 flex gap-2">
              <Link
                href="/login"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Try it
              </Link>
              <Link
                href="#features"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="relative h-screen snap-start bg-gradient-to-t from-teal-500"
      >
        {/* Bullet point */}
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-7 text-center text-6xl font-bold">Features</h1>
            <div className="flex flex-wrap justify-center gap-4 p-5">
              <div className="flex select-none rounded-md border border-black p-2 dark:border-white">
                <Icons.bookmark className="mr-2 w-6" />
                Personal game library
              </div>
              <div className="flex select-none rounded-md border border-black p-2 dark:border-white">
                <Icons.star className="mr-2 w-6" />
                Vote system
              </div>
              <div className="flex select-none rounded-md border border-black p-2 dark:border-white">
                <Icons.barChart className="mr-2 w-6" />
                Game recommendations
              </div>
              <div className="flex select-none rounded-md border border-black p-2 dark:border-white">
                <Icons.search className="mr-2 w-6" />
                Game search
              </div>
              <div className="flex select-none rounded-md border border-black p-2 dark:border-white">
                <Icons.video className="mr-2 w-6" />
                Game screenshots and trailers
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 mb-5 flex w-full items-center justify-center">
          <Link href="#made-with">
            <Icons.chevronDown className="h-10 w-10" />
          </Link>
        </div>
      </section>
      <section
        id="made-with"
        className="h-screen snap-start bg-gradient-to-b from-teal-500 to-orange-300"
      >
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-7 text-center text-6xl font-bold">Made with</h1>
            <div className="flex flex-wrap justify-center gap-4 p-5">
              <Link
                href="https://nextjs.org/"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Next.js
              </Link>
              <Link
                href="https://reactjs.org/"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                React
              </Link>
              <Link
                href="https://tailwindcss.com/"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Tailwind CSS
              </Link>
              <Link
                href="https://www.typescriptlang.org/"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                TypeScript
              </Link>
              <Link
                href="https://www.postgresql.org/"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                PostgreSQL
              </Link>
              <Link
                href="https://www.prisma.io/"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Prisma
              </Link>
              <Link
                href="https://legendapp.com/open-source/state/"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                LegendApp State
              </Link>
              <Link
                href="https://lucide.dev/icons/"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Lucide Icons
              </Link>
              <Link
                href="https://fkhadra.github.io/react-toastify/introduction"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                React Tosatify
              </Link>
              <Link
                href="https://www.docker.com/"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Docker
              </Link>
            </div>
            <Link
              href="https://github.com/lilooraf"
              className={cn(buttonVariants({ variant: "link" }), "mt-4")}
            >
              By @lilooraf
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
