import { useEffect, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import Input from "~/components/ui/input"
import type { App } from "~/lib/variables"
import { useAppStore } from "~/store/app-store"
import type { Setter } from "~/types/react"
import AppCard from "../../shared/app-card"

interface AIToolCardProps {
  aiTool: App
  setAITool?: Setter<App | null>
}

const AIToolCard = (props: AIToolCardProps) => {
  const { updateAITool: update, removeAITool: remove } = useAppStore()
  const [aiTool, setAITool] = useState<App>(props.aiTool)
  const [debouncedIcon] = useDebounceValue(props.aiTool.icon, 500)
  const [debouncedValue] = useDebounceValue(aiTool, 500)

  useEffect(() => {
    props.setAITool?.(aiTool)
  }, [aiTool, props.setAITool])

  useEffect(() => {
    if (Object.values(debouncedValue).some((value) => value === "")) {
      return
    }

    if (JSON.stringify(debouncedValue) !== JSON.stringify(props.aiTool)) {
      update(props.aiTool.id, debouncedValue)
    }
  }, [debouncedValue, props.aiTool, update])

  return (
    <AppCard icon={debouncedIcon} delFunc={() => remove(aiTool.name)}>
      <Input
        variant="secondary"
        id="aitool-name"
        placeholder="icon"
        value={aiTool.icon}
        onInput={({ currentTarget: { value } }) =>
          setAITool((prev) => ({ ...prev, icon: value }))
        }
        className="text-foreground"
      />
      <Input
        variant="secondary"
        id="aitool-name"
        placeholder="name"
        value={aiTool.name}
        onInput={({ currentTarget: { value } }) =>
          setAITool((prev) => ({ ...prev, name: value }))
        }
        className="text-foreground"
      />
      <Input
        variant="secondary"
        id="aitool-url"
        placeholder="url"
        value={aiTool.url}
        onInput={({ currentTarget: { value } }) =>
          setAITool((prev) => ({ ...prev, url: value }))
        }
        className="text-foreground"
      />
    </AppCard>
  )
}

export default AIToolCard
