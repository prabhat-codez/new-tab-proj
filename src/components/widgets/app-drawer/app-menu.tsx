import type React from "react"
import { useEffect } from "react"
import Menu from "~/components/ui/menu"
import { useAppStore } from "~/store/app-store"
import type { App } from "../../../lib/variables"
import { appListStore } from "./selected-app.store"

interface AppMenuProps {
  children: React.ReactNode
  app: App
}

const AppMenu = ({ children, app }: AppMenuProps) => {
  const { removeDrawerApp, dockApps, addToDock } = useAppStore()
  const setSelectedApp = appListStore((s) => s.setSelectedApp)

  const isCurrentAppInDock = (): boolean => {
    return typeof dockApps.find(({ name }) => name === app.name) !== "undefined"
  }

  useEffect(() => {
    return () => setSelectedApp(null)
  }, [setSelectedApp])

  return (
    <Menu
      title={app.name}
      menuTrigger={children}
      data={[
        {
          icon: "tabler:layout-grid-add",
          label: "Add to dock",
          func: () => addToDock(app),
          disabled: isCurrentAppInDock(),
        },
        {
          label: "Edit/Update",
          icon: "tabler:mood-edit",
          func: () => setSelectedApp(app),
        },
        {
          label: "Remove",
          icon: "tabler:trash",
          func: () => removeDrawerApp(app.name),
        },
      ]}
    />
  )
}

export default AppMenu
