import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Query } from "~/types"
import { getDomain } from "~/utils"

interface QueryStore {
  list: Query[]
  addQuery: (q: Query) => void
  removeQuery: (id: string) => void
  setQueries: (q: Query[]) => void
  reset: () => void
}

export const useQueryStore = create(
  persist<QueryStore>(
    (set) => ({
      list: [],
      addQuery: (q) =>
        set((prev) => {
          const newList = [q, ...prev.list]
          return { list: getUniqueQueries(newList) }
        }),
      removeQuery: (id) =>
        set((prev) => ({ list: prev.list.filter((q) => q.id !== id) })),
      setQueries: (q) => set({ list: q }),
      reset: () => set({ list: [] }),
    }),
    { name: "query-histories" },
  ),
)

// Removes duplicate domains, keeping the highest-priority URL:
// preferring https:// > www. > http://
function getUniqueQueries(queries: Query[]) {
  const domainMap = new Map<string, Query>()

  for (const query of queries) {
    const domain = getDomain(query.query)
    const existing = domainMap.get(domain)

    if (!existing || compProtocol(existing.query, query.query) > 0) {
      domainMap.set(domain, query)
    }
  }

  return Array.from(domainMap.values())
}

function compProtocol(url1: string, url2: string) {
  const priority = (url: string) =>
    url.startsWith("https://") ? 1 : url.startsWith("www.") ? 2 : 3
  return priority(url1) - priority(url2)
}
