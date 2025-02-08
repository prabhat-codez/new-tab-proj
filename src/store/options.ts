import * as idb from "idb-keyval"
import { create } from "zustand"
import { combine, persist } from "zustand/middleware"

export const useOptionsStore = create(
  persist(
    combine(
      {
        // Clock
        enableDigitalClock: false,
        format24: false,
        greetings: true,

        customText: "Click here to edit",

        // Misc
        weatherAPI: "",
        weatherLocation: "Delhi",
        isScaleFahrenheit: false,
        isAIToolsEnabled: true,
        isAppDrawerEnabled: true,
        isMonochromeIcon: false,

        // DockApp
        isDockEnabled: true,

        // Image Options
        isMonochromeWidgetImg: false,
        currentImageIndex: 0,
        pinnedWidgetImgIndex: null as number | null,
        isBgImage: false,
        bgImageId: null as string | null,
        isMonochromeBg: false,
        isBgBlur: true,
        gallaryImageInterval: 10,

        // SearchInput
        isQuerySuggestions: true,
      },
      (set, get) => ({
        // Clock Setters
        toggleDidigtalClock: () =>
          set((state) => ({ enableDigitalClock: !state.enableDigitalClock })),
        toggleFormat24: () => set((state) => ({ format24: !state.format24 })),
        toggelGreetings: () =>
          set((state) => ({ greetings: !state.greetings })),

        // Misc Setters
        setWeatherAPI: (key: string) => set({ weatherAPI: key }),
        setWeatherLocation: (location: string) =>
          set({ weatherLocation: location }),
        toggleFahrenheitScale: () =>
          set((state) => ({
            isScaleFahrenheit: !state.isScaleFahrenheit,
          })),
        toggleEnableAITools: () =>
          set((prev) => ({ isAIToolsEnabled: !prev.isAIToolsEnabled })),
        toggleMonochromeIcon: () => {
          set((prev) => ({ isMonochromeIcon: !prev.isMonochromeIcon }))
        },

        // App Drwaer setters
        toggleEnableAppDrawer: () =>
          set((prev) => ({
            isAppDrawerEnabled: !prev.isAppDrawerEnabled,
          })),

        // DockApp Setters
        toggleDock: () =>
          set((prev) => ({ isDockEnabled: !prev.isDockEnabled })),
        setCustomText: (text: string) => set({ customText: text }),

        // Image setters
        toggleMonochromeWidgetImg: () => {
          set((prev) => ({
            isMonochromeWidgetImg: !prev.isMonochromeWidgetImg,
          }))
        },
        setPinnedWidgetImgIndex: (index: number | null) => {
          set({ pinnedWidgetImgIndex: index })
        },
        setCurrentImageIndex: (index: number) => {
          set({ currentImageIndex: index })
        },
        toggleBgImage: () => set((prev) => ({ isBgImage: !prev.isBgImage })),
        toggleMonochromeBg: () => {
          set((prev) => ({ isMonochromeBg: !prev.isMonochromeBg }))
        },
        toggleBgBlur: () => set((prev) => ({ isBgBlur: !prev.isBgBlur })),
        setBgImageId: (id: string | null) => set({ bgImageId: id }),
        setGallaryImageInterval: (interval: number) => {
          if (get().gallaryImageInterval !== interval) {
            set({ gallaryImageInterval: interval })
          }
        },
        restoreDefaults: async () => {
          localStorage.removeItem("nothing-newtab-options")
          await idb.clear().then(() => window.location.reload())
        },

        // SearchInput Methods
        toggleQuerySuggestions: () =>
          set((prev) => ({ isQuerySuggestions: !prev.isQuerySuggestions })),
      }),
    ),
    {
      name: "nothing-newtab-options",
    },
  ),
)
