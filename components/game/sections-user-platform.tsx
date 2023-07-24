"use client"
import { useState } from "react"

import { GamesSection } from "@/components/game/section"
import { Button } from "@/components/ui/button"
import { useUserPlatforms } from "@/hooks/use-user"
import { PlatformType } from "@/types"
import { Modal } from "@/components/modal"
import { UserPlatformsForm } from "@/components/user-platforms-form"
import { observer } from "@legendapp/state/react"
import { gameLists } from "@/config/game-lists"

export const SectionsUserPlatforms = observer(() => {
  const platforms = useUserPlatforms()
  const [showModal, setShowModal] = useState(false)

  const idPlus = gameLists.length

  return (
    <>
      {platforms.get()?.length ? (
        platforms.get()?.map((platform, index) => (
          <GamesSection
            key={platform.name}
            gameList={{
              title: platform.longName,
              RequestType: "platforms",
              platforms: [platform.name as PlatformType],
            }}
            id={index + idPlus}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center gap-8">
          <Button
            variant={"link"}
            onClick={() => {
              setShowModal(true)
            }}
          >
            Select your platforms
          </Button>
        </div>
      )}
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
})
