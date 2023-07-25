import type { Metadata } from "next"
import "react-toastify/dist/ReactToastify.css"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Gameflix",
  description: "",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-black">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
