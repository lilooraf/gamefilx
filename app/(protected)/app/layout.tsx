import type { Metadata } from "next"

import NavBar from "@/components/nav-bar"
import { appNav } from "@/config/app-nav"

export const metadata: Metadata = {
  title: "GameFlix",
  description: "Today's recommendations",
}

export const dynamic = "force-dynamic"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavBar items={appNav} />
      {children}
    </>
  )
}
