import { disableCache, enableCache } from "@iconify/react/dist/iconify.js"
import { motion } from "framer-motion"
import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import Button from "~/components/ui/button"
import type { App } from "~/lib/variables"
import { useAppStore } from "~/store/app-store"
import NewTabHeader from "../shared/newtab-header"
import DockAppCard from "./dock-app-card"

const DockOptions = () => {
  const [newApp, setNewApp] = useState<App | null>(null)
  const { addDockApp, dockApps, resetDockApp } = useAppStore()

  const addNewApp = () => {
    setNewApp({
      id: nanoid(),
      name: "",
      icon: "fe:bookmark",
      url: "",
    })
  }

  const saveEngineHandler = () => {
    if (!newApp) return

    if (Object.values(newApp).some((v) => v === "")) {
      alert("You must fill all the fields")
    } else {
      if (!dockApps.find(({ name }) => name === newApp.name)) {
        addDockApp(newApp)
        setNewApp(null)
      } else {
        alert(`App with name ${newApp.name} already exists`)
      }
    }
  }

  useEffect(() => {
    disableCache("all")
    return () => enableCache("local")
  }, [])

  return (
    <div className="space-y-6">
      <NewTabHeader
        rightButtons={
          <>
            <Button
              variant="secondary"
              size="icon"
              iconSize={20}
              icon="material-symbols:device-reset-rounded"
              onClick={resetDockApp}
            />
            <Button
              variant="secondary"
              size="icon"
              iconSize={20}
              icon="ic:round-plus"
              onClick={addNewApp}
            />
          </>
        }
      />
      <motion.div layout>
        {newApp && (
          <div className="rounded-xl bg-background">
            <DockAppCard dockApp={newApp} setDockApp={setNewApp} />
            <div className="grid grid-cols-2 gap-3 p-4 pt-0">
              <Button onClick={() => setNewApp(null)}>Cancel</Button>
              <Button variant="accent" onClick={saveEngineHandler}>
                Save
              </Button>
            </div>
          </div>
        )}
      </motion.div>
      <div className="h-full space-y-5">
        {dockApps.map((app) => (
          <motion.div layout key={`app-${app.name}`}>
            <DockAppCard dockApp={app} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default DockOptions
