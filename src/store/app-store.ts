import * as idb from "idb-keyval"
import { create } from "zustand"
import { combine, createJSONStorage, persist } from "zustand/middleware"
import {
  type App,
  aiTools as initialAITools,
  dockApps as initialDockApps,
  drawerApps as initialDrawerApps,
} from "../lib/variables"

export const useAppStore = create(
  persist(
    combine(
      {
        drawerApps: sortApps(initialDrawerApps),
        dockApps: sortApps(initialDockApps),
        aiTools: sortApps(initialAITools),
      },
      (set) => ({
        // Drawer Apps
        addDrawerApp: (app: App) => {
          set((prev) => ({ drawerApps: addApp(prev.drawerApps, app) }))
        },
        addToDock: (app: App) => {
          set((prev) => ({ dockApps: [...prev.dockApps, app] }))
        },
        updateDrawerApp: (id: string, app: App) => {
          set((prev) => ({ drawerApps: updateApp(prev.drawerApps, id, app) }))
        },
        removeDrawerApp: (name: string) => {
          set((prev) => ({
            drawerApps: removeApp(prev.drawerApps, name),
          }))
        },
        resetDrawerApp: () => set({ drawerApps: initialDrawerApps }),

        // AI Tools
        addAITool: (app: App) => {
          set((prev) => ({ aiTools: addApp(prev.aiTools, app) }))
        },
        updateAITool: (id: string, app: App) => {
          set((prev) => ({ aiTools: updateApp(prev.aiTools, id, app) }))
        },
        removeAITool: (name: string) => {
          set((prev) => ({
            aiTools: removeApp(prev.aiTools, name),
          }))
        },
        resetAITools: () => set({ aiTools: initialAITools }),

        // Dock Apps
        addDockApp: (app: App) =>
          set((prev) => ({ dockApps: addApp(prev.dockApps, app) })),
        removeDockApp: (name: string) => {
          set((prev) => ({
            dockApps: removeApp(prev.dockApps, name),
          }))
        },
        updateDockApp: (id: string, app: App) => {
          set((prev) => ({ dockApps: updateApp(prev.dockApps, id, app) }))
        },
        resetDockApp: () => set({ dockApps: initialDockApps }),
      }),
    ),
    {
      // Persistent storage options
      storage: createJSONStorage(() => ({
        getItem: idb.get,
        setItem: idb.set,
        removeItem: idb.del,
      })),
      name: "app-store",
    },
  ),
)
// App list actions
function sortApps(list: App[]) {
  return list.sort((a, b) => a.name.localeCompare(b.name))
}

function addApp(list: App[], newApp: App): App[] {
  if (!list.find(({ name }) => name === newApp.name)) {
    return [...list, newApp]
  }
  alert("You can't add another app with same name")
  return list
}

function removeApp(list: App[], name: string) {
  return list.filter((app) => app.name !== name)
}

function updateApp(list: App[], id: string, updatedApp: App) {
  return list.map((app) => (app.id === id ? updatedApp : app))
}
