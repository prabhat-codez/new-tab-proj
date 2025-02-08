import { Icon } from "@iconify/react/dist/iconify.js"
import type React from "react"
import Button from "~/components/ui/button"

interface AppCardProps {
  icon: string
  children: React.ReactNode
  delFunc: () => void
}

const AppCard = ({ icon, children, delFunc }: AppCardProps) => {
  return (
    <div className="relative flex flex-col items-center rounded-xl bg-background p-4">
      <span className="flex size-11 items-center justify-center gap-1 rounded-full bg-card text-foreground transition-colors duration-300">
        {icon.startsWith("webicon:") ? (
          <img
            src={`https://www.google.com/s2/favicons?domain=${icon.split(":")[1]}&sz=128`}
            alt="app-icon"
          />
        ) : (
          <Icon icon={icon || "mynaui:daze-ghost"} fontSize={24} />
        )}
      </span>
      <div className="flex w-full flex-col space-y-2 pt-6">{children}</div>
      <Button
        variant="secondary"
        icon="mdi:trash-outline"
        size="icon"
        className="absolute top-3 right-3 size-8"
        onClick={delFunc}
      />
    </div>
  )
}
export default AppCard
