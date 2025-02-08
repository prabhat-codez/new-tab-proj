import { create } from "zustand"

export type Tab = "default" | "apps" | "gallery" | "search-engines" | "ai-tools"

interface SiebarOptions {
  tab: Tab
  setTab: (tab: Tab) => void
}

export const useSidebarOptions = create<SiebarOptions>()((set) => ({
  tab: "default",
  setTab: (tab: Tab) => set({ tab }),
}))
