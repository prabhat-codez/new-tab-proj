import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import clsx from "clsx"
import type React from "react"
import type { Setter } from "../../types/react"
import Button from "./button"

interface ModalProps {
  title?: string
  description?: string
  isOpen: boolean
  setIsOpen: Setter<boolean>
  btnFunc?: () => void
  children?: React.ReactNode
  btnDisabled?: boolean
}

export default function Modal({
  title,
  description,
  isOpen,
  setIsOpen,
  btnFunc,
  children,
  btnDisabled = false,
}: ModalProps) {
  function close() {
    setIsOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 select-none font-rubik focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className={clsx([
              "w-full max-w-md rounded-xl border-2 border-card-foreground/20 bg-card p-4 duration-300",
              "data-[closed]:opacity-0",
              // Entering styles
              "data-[enter]:data-[closed]:scale-95",
              // Leaving styles
              "data-[leave]:data-[closed]:scale-95",
            ])}
          >
            <DialogTitle
              as="h3"
              className="font-medium text-base/7 text-card-foreground"
            >
              {title}
            </DialogTitle>
            {description && (
              <p className="text-card-foreground/50 text-sm/6">{description}</p>
            )}
            {children}
            {btnFunc && (
              <div className="mt-4">
                <Button
                  variant="secondary"
                  className="ml-auto h-11 min-w-24"
                  onClick={() => (!btnFunc ? setIsOpen(false) : btnFunc())}
                  disabled={btnDisabled}
                >
                  Save
                </Button>
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
