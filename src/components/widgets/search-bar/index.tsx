import { Icon } from "@iconify/react/dist/iconify.js"
import { useSearchEngineStore } from "~/store/search-engine"
import { searchProviders } from "../../../lib/variables"
import SearchEngines from "./search-engines"
import SearchInput from "./search-input"

const SearchBarIcon = () => {
  const selectedEngine = useSearchEngineStore((s) => s.selectedEngine)
  const icon = searchProviders.find(({ name }) => name === selectedEngine)?.icon

  return (
    <div className="flex size-[100px] items-center justify-center rounded-full bg-card text-card-foreground">
      {icon && <Icon icon={icon} fontSize={40} />}
    </div>
  )
}

const SearchBar = () => {
  return (
    <div className="w-[596px] space-y-3">
      <SearchInput />
      <div className="flex gap-3">
        <div className="inline-flex gap-3">
          <SearchBarIcon />
          <span className="h-full w-1 rounded-full bg-muted" />
        </div>
        <div>
          <SearchEngines />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
