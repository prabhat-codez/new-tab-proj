import { create } from "zustand"
import { persist } from "zustand/middleware"

type ThemeStore = {
  isLightMode: boolean
  toggleLightMode: () => void
}

export const useThemeStore = create(
  persist<ThemeStore>(
    (set) => ({
      isLightMode: false,
      toggleLightMode: () => {
        set((prev) => ({ isLightMode: !prev.isLightMode }))
      },
    }),
    { name: "data-theme" },
  ),
)
