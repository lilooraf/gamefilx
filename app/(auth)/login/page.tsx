"use client"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { toast } from "react-toastify"

import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

// Todo: make this a server component
// Todo: make a login-form component

export default function Login() {
  const searchParams = useSearchParams()
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false)

  const error = searchParams?.get("error")

  if (error == "OAuthAccountNotLinked") {
    toast.info(
      "This account is already in use. Please try again with another login method."
    )
  } else if (error == "OAuthCreateAccountError") {
    toast.error("Your connection request failed. Please try again.")
  } else if (error == "Callback") {
    toast.error("Your connection request failed. Please try again.")
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-8">
        <p className="mb-7 text-center text-5xl font-bold">
          Welcome to Game
          <span className="bg-gradient-to-t from-indigo-500 to-black bg-clip-text text-transparent dark:to-white">
            flix
          </span>
        </p>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 text-slate-600">Connect with</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => {
            setIsGitHubLoading(true)
            signIn("github", {
              callbackUrl: searchParams?.get("from") || "/app",
              redirect: false,
            })
          }}
          disabled={isGitHubLoading}
        >
          {isGitHubLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          GitHub
        </button>

        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => {
            setIsGoogleLoading(true)
            signIn("google", {
              callbackUrl: searchParams?.get("from") || "/app",
              redirect: false,
            })
          }}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </button>
      </div>
    </div>
  )
}
