import { disableCache, enableCache } from "@iconify/react/dist/iconify.js"
import { motion } from "framer-motion"
import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import Button from "~/components/ui/button"
import type { App } from "~/lib/variables"
import { useAppStore } from "~/store/app-store"
import NewTabHeader from "../../shared/newtab-header"
import AIToolCard from "./ai-tools-card"

const AIToolsTab = () => {
  const { aiTools, addAITool: add, resetAITools: reset } = useAppStore()
  const [newAITool, setNewAITool] = useState<App | null>(null)

  const addNewAITool = () => {
    setNewAITool({ id: nanoid(), name: "", icon: "mingcute:ai-fill", url: "" })
  }

  const saveEngineHandler = () => {
    if (!newAITool) return

    if (!aiTools.find(({ name }) => name === newAITool.name)) {
      add(newAITool)
      setNewAITool(null)
    } else {
      alert(
        "The name for the new AI tool must be unique. Please choose a different one",
      )
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
              onClick={reset}
            />
            <Button
              variant="secondary"
              size="icon"
              iconSize={20}
              icon="ic:round-plus"
              onClick={addNewAITool}
            />
          </>
        }
      />
      <div className="space-y-3">
        <motion.div layout>
          {newAITool && (
            <div className="rounded-xl bg-background">
              <AIToolCard aiTool={newAITool} setAITool={setNewAITool} />
              <div className="grid grid-cols-2 gap-3 p-4 pt-0">
                <Button onClick={() => setNewAITool(null)}>Cancel</Button>
                <Button variant="accent" onClick={saveEngineHandler}>
                  Save
                </Button>
              </div>
            </div>
          )}
        </motion.div>
        {aiTools.map((tool) => (
          <motion.div layout key={`ai-tool-card-${tool.name}`}>
            <AIToolCard aiTool={tool} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AIToolsTab
