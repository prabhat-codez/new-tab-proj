import { useEffect, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import Button from "~/components/ui/button"
import Input from "~/components/ui/input"
import { type SearchEngine, useSearchEngineStore } from "~/store/search-engine"
import type { Setter } from "~/types/react"

interface SearchEngineCardProps {
  index: number
  engine: SearchEngine
  setEngine?: Setter<SearchEngine | null>
}

const SearchEngineCard = (props: SearchEngineCardProps) => {
  const { searchEngines, update, remove } = useSearchEngineStore()
  const [engine, setEngine] = useState<SearchEngine>(props.engine)
  const [debouncedEngine] = useDebounceValue(engine, 500)

  useEffect(() => {
    props.setEngine?.(engine)
  }, [engine, props.setEngine])

  useEffect(() => {
    if (Object.values(debouncedEngine).some((value) => value === "")) {
      return
    }

    if (
      props.index < searchEngines.length - 1 &&
      JSON.stringify(debouncedEngine) !== JSON.stringify(props.engine)
    ) {
      update(props.index, debouncedEngine)
    }
  }, [debouncedEngine, searchEngines, props, update])

  return (
    <div className="relative flex flex-col items-center rounded-xl bg-background p-4">
      <Button size="icon" className="size-14 shrink-0" icon={engine.icon} />
      <div className="space-y-2 pt-6">
        <Input
          variant="secondary"
          id="searchengine-icon"
          placeholder="icon url"
          value={engine.icon}
          onInput={({ currentTarget: { value } }) =>
            setEngine((prev) => ({ ...prev, icon: value }))
          }
          className="text-foreground"
        />
        <div className="inline-flex gap-2">
          <Input
            variant="secondary"
            id="searchengine-name"
            placeholder="name"
            value={engine.name}
            onInput={({ currentTarget: { value } }) =>
              setEngine((prev) => ({ ...prev, name: value }))
            }
            className="text-foreground"
          />
          <Input
            variant="secondary"
            id="searchengine-shortcut"
            placeholder="shortcut"
            value={engine.short}
            onInput={({ currentTarget: { value } }) =>
              setEngine((prev) => ({ ...prev, short: value.trim() }))
            }
            className="text-foreground"
          />
        </div>
        <Input
          variant="secondary"
          id="searchengine-base-url"
          placeholder="base url"
          value={engine.baseUrl}
          onInput={({ currentTarget: { value } }) =>
            setEngine((prev) => ({ ...prev, baseUrl: value }))
          }
          className="text-foreground"
        />
      </div>
      <Button
        variant="secondary"
        icon="mdi:trash-outline"
        size="icon"
        className="absolute top-3 right-3 size-8"
        onClick={() => remove(engine.name)}
      />
    </div>
  )
}

export default SearchEngineCard
