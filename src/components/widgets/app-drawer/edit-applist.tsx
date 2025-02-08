import clsx from "clsx"
import { useState } from "react"
import { useAppStore } from "~/store/app-store"
import type { Setter } from "../../../types/react"
import Button from "../../ui/button"
import AppForm from "./app-form"
import { appListStore } from "./selected-app.store"

interface EditAppListProps {
  removeMode: boolean
  setRemoveMode: Setter<boolean>
}

const EditAppList = ({ removeMode, setRemoveMode }: EditAppListProps) => {
  const resetDrawerApp = useAppStore((s) => s.resetDrawerApp)
  const [isOpen, setIsOpen] = useState(false)

  const { selectedApp, setSelectedApp } = appListStore()

  return (
    <>
      <div className="inline-flex gap-2">
        <Button
          icon="tabler:plus"
          size="icon"
          className="rounded-xl"
          iconSize={20}
          onClick={() => setIsOpen(true)}
        />
        <Button
          variant={removeMode ? "destructive" : "primary"}
          icon="tabler:trash"
          size="icon"
          className={clsx("rounded-xl")}
          onClick={() => setRemoveMode((prev) => !prev)}
          iconSize={20}
        />
        <Button
          icon="material-symbols:device-reset-rounded"
          size="icon"
          className={clsx("rounded-xl")}
          onClick={resetDrawerApp}
          iconSize={20}
        />
      </div>
      <AppForm
        isOpen={isOpen || selectedApp !== null}
        setIsOpen={
          selectedApp !== null ? () => setSelectedApp(null) : setIsOpen
        }
        app={selectedApp}
      />
    </>
  )
}

export default EditAppList
