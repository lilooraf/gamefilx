import { redirect } from "next/navigation"

import { UserPlatformsForm } from "@/components/user-platforms-form"
import { getCurrentUser } from "@/lib/session"

export default async function NewUserPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className="text-3xl font-bold">Welcome {user?.name} 🎉</h2>
        <p className="text-lg">
          You are now logged in. You can now start adding games to your library.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-10">
        <p className="text-lg">
          But first, we need to know what platforms you own. Please select the
          platforms you own below.
        </p>

        <UserPlatformsForm withLink />

        <p className="text-lg">
          <span className="font-bold">Note:</span> Don&apos;t worry, you can
          always add more platforms later.
        </p>
      </div>
    </div>
  )
}
