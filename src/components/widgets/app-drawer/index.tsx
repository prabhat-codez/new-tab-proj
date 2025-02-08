import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import Button from "../../ui/button"
import AppList from "./app-list"
import EditAppList from "./edit-applist"

const AppDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [removeMode, setRemoveMode] = useState(false)

  return (
    <div className="fixed top-4 right-4 z-10 flex flex-col items-end gap-2">
      <div className="flex w-full gap-2">
        {isOpen && <EditAppList {...{ removeMode, setRemoveMode }} />}
        <Button
          icon="tabler:apps"
          size="icon"
          className="ml-auto flex-shrink-0 rounded-xl"
          iconSize={20}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
      <AnimatePresence mode="wait">
        {isOpen && <AppList isRemoveMode={removeMode} />}
      </AnimatePresence>
    </div>
  )
}

export default AppDrawer
