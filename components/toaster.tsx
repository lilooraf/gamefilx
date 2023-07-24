"use client"
import { ToastContainer } from "react-toastify"
import { useTheme } from "next-themes"

export const Toaster = () => {
  const { theme } = useTheme()

  return (
    <ToastContainer
      position="bottom-right"
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme == "dark" ? "dark" : "light"}
    />
  )
}
