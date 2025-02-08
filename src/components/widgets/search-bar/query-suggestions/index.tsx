import { motion } from "framer-motion"
import { useMemo } from "react"
import { useQueryStore } from "~/store/query-history"
import { useSearchEngineStore } from "~/store/search-engine"
import type { Query } from "~/types"
import { cn } from "~/utils"
import SuggestionItem from "./suggestion-item"

interface QuerySuggestionsProps {
  className?: string
  filterString: string | null
}

export default function QuerySuggestions(props: QuerySuggestionsProps) {
  const { className, filterString } = props

  const { list, removeQuery } = useQueryStore()

  const getSelectedEngine = useSearchEngineStore(
    (prev) => prev.getSelectedEngine,
  )

  // Filtering query from db matching user input query
  const filteredList: Query[] = useMemo(() => {
    if (!filterString) return []

    return list.filter(({ query }) => {
      // Creates a regex to match words starting with the filter string, ignoring
      // non-word characters. The match is case-insensitive and ensures the
      // filter string only matches the beginning of words.
      return new RegExp(
        `\\b${filterString.replace(/[^\w]/g, "")}.*`,
        "gi",
      ).test(query)
    })
  }, [list, filterString])

  if (filteredList.length === 0 || !filterString) {
    return null
  }

  return (
    <motion.ul
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      tabIndex={-1}
      layout
      id="query-suggestions"
      className={cn(
        "z-10 max-h-64 w-full overflow-auto rounded-xl bg-background p-1",
        className,
      )}
    >
      {filteredList.map((query) => (
        <li key={query.id}>
          <SuggestionItem
            qry={query}
            remove={() => removeQuery(query.id)}
            selectedEngine={getSelectedEngine()?.baseUrl!}
            filterString={filterString}
          />
        </li>
      ))}
    </motion.ul>
  )
}
