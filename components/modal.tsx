import React from "react"

import useOutsideCloser from "@/hooks/use-outside-closer"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

interface ModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  customColor?: [number, number, number]
}

export const Modal = ({
  children,
  isOpen,
  onClose,
  customColor,
  className,
}: ModalProps) => {
  const ref = React.useRef<HTMLDivElement>(null)

  useOutsideCloser(ref, () => {
    onClose()
  })

  return (
    <>
      {isOpen && (
        <div
          className={`blurry-background fixed inset-0 z-40 flex items-center justify-center bg-black/50 transition-opacity duration-300`}
        >
          <div
            ref={ref}
            className={`relative z-50 m-2 rounded-md bg-white shadow-xl transition-transform duration-300 dark:bg-black`}
          >
            <div
              style={{
                ...(customColor && {
                  backgroundColor: `rgba(${customColor}, 0.4)`,
                }),
              }}
              className={cn(
                "flex h-full max-h-[85vh] w-full overflow-y-auto overscroll-contain rounded-md p-8",
                className
              )}
            >
              {children}
            </div>
            <div>
              <button
                className="group/button absolute right-0 top-0 m-2 flex h-8 w-8 items-center justify-center"
                onClick={() => onClose()}
              >
                <Icons.close className="w-5 transition-transform group-hover/button:scale-125" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
