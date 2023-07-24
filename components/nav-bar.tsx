import Link from "next/link"

import { NavItem } from "@/types"
import { getCurrentUser } from "@/lib/session"
import { UserAccountNav } from "@/components/user-account-nav"
import { NavLinks } from "@/components/nav-links"
import { Icons } from "@/components/icons"
import MobileNav from "@/components/mobile-nav"
import { ThemeToggle } from "./theme-toggle"

interface NavProps {
  items: NavItem[]
}

export default async function NavBar({ items }: NavProps) {
  const user = await getCurrentUser()

  return (
    <>
      <nav className="sticky top-0 z-40 hidden justify-between gap-6 bg-gradient-to-b from-white via-white to-transparent px-5 py-4 dark:from-black dark:via-black lg:flex">
        <div className="flex items-center gap-5">
          <Link href="/">
            <Icons.app className="h-8 w-8 text-indigo-500" />
          </Link>
          <NavLinks items={items} />
        </div>
        <div className="flex items-center justify-center gap-2 align-middle">
          <ThemeToggle />
          <UserAccountNav user={user} />
        </div>
      </nav>
      <MobileNav items={items} user={user} />
    </>
  )
}
