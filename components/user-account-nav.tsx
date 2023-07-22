"use client"
import { useRef, useState } from "react"
import { signOut } from "next-auth/react"
import Image from "next/image"

import useOutsideCloser from "@/hooks/use-outside-closer"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/modal"
import { UserPlatformsForm } from "@/components/user-platforms-form"

interface UserAccountNavProps {
  user?: {
    name?: string | null
    image?: string | null
    email?: string | null
  }
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const [showModal, setShowModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const ref = useRef(null)

  useOutsideCloser(ref, () => setShowMenu(false))

  return (
    <>
      <div className="relative">
        <Button
          className="h-10 w-10 rounded-full p-0"
          onClick={() => setShowMenu(!showMenu)}
        >
          <Image
            src={user?.image || ""}
            alt={user?.name || ""}
            className="h-10 w-10 rounded-full"
            width={40}
            height={40}
          />
        </Button>
        {showMenu && (
          <div
            ref={ref}
            className="absolute right-0 top-12 z-40 flex w-44 flex-col gap-1 rounded-md bg-slate-200 p-2 drop-shadow-md dark:bg-slate-800"
          >
            <div className="flex flex-col border-b border-slate-300 pb-1 dark:border-gray-500">
              <span className="text-sm font-semibold">{user?.name}</span>
              <span className="text-xs opacity-50">{user?.email}</span>
            </div>
            <Button
              onClick={() => {
                setShowModal(true)
                setShowMenu(false)
              }}
              variant={"default"}
              className="flex items-center justify-between"
            >
              Platforms
              <Icons.app />
            </Button>
            <Button
              onClick={() => {
                signOut({
                  callbackUrl: `${window.location.origin}/`,
                })
              }}
              variant={"destructive"}
              className="flex items-center justify-between"
            >
              Logout
              <Icons.logout />
            </Button>
          </div>
        )}
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        className="bg-slate-200 dark:bg-slate-800"
      >
        <div className="flex flex-col items-center justify-center gap-8">
          <p className="text-xl font-bold">Select your platforms</p>
          <UserPlatformsForm />
        </div>
      </Modal>
    </>
  )
}
