import { useEffect, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import Input from "~/components/ui/input"
import type { App } from "~/lib/variables"
import { useAppStore } from "~/store/app-store"
import type { Setter } from "~/types/react"
import AppCard from "../shared/app-card"

interface DockAppCardProps {
  dockApp: App
  setDockApp?: Setter<App | null>
}

export default function DockAppCard(props: DockAppCardProps) {
  const { updateDockApp: update, removeDockApp: remove } = useAppStore()

  const [dockApp, setDockApp] = useState<App>(props.dockApp)
  const [debouncedIcon] = useDebounceValue(props.dockApp.icon, 500)
  const [debouncedValue] = useDebounceValue(dockApp, 500)

  useEffect(() => {
    props.setDockApp?.(dockApp)
  }, [dockApp, props.setDockApp])

  useEffect(() => {
    if (Object.values(debouncedValue).some((value) => value === "")) {
      return
    }

    if (JSON.stringify(debouncedValue) !== JSON.stringify(props.dockApp)) {
      update(props.dockApp.id, debouncedValue)
    }
  }, [debouncedValue, props.dockApp, update])

  return (
    <AppCard icon={debouncedIcon} delFunc={() => remove(props.dockApp.name)}>
      <Input
        variant="secondary"
        id={`dockApp-icon-${props.dockApp.name}`}
        placeholder="icon"
        value={dockApp.icon}
        onInput={({ currentTarget: { value } }) =>
          setDockApp((prev) => ({ ...prev, icon: value }))
        }
        className="text-foreground"
      />
      <Input
        variant="secondary"
        id={`dockApp-name-${props.dockApp.name}`}
        placeholder="name"
        value={dockApp.name}
        onInput={({ currentTarget: { value } }) =>
          setDockApp((prev) => ({ ...prev, name: value }))
        }
        className="text-foreground"
      />
      <Input
        variant="secondary"
        id={`dockApp-url-${props.dockApp.name}`}
        placeholder="url"
        value={dockApp.url}
        onInput={({ currentTarget: { value } }) =>
          setDockApp((prev) => ({ ...prev, url: value }))
        }
        className="text-foreground"
      />
    </AppCard>
  )
}
