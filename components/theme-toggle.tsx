"use client"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export const ThemeToggle = () => {
  const {theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      className="p-2"
      onClick={() => {
        setTheme(theme == "dark" ? "light" : "dark")
      }}
    >
      <Icons.sun className="rotate-0 scale-100 transition-all duration-1000 dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute rotate-90 scale-0 transition-all duration-1000 dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
