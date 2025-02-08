import { create } from "zustand"
import { combine } from "zustand/middleware"
import type { App } from "../../../lib/variables"

export const appListStore = create(
  combine(
    {
      selectedApp: null as App | null,
    },
    (set) => ({
      setSelectedApp: (app: App | null) => set({ selectedApp: app }),
    }),
  ),
)
