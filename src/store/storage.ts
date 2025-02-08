import { del, get, set } from "idb-keyval"
import { createJSONStorage } from "zustand/middleware"

export const indexDbStorage = createJSONStorage(() => ({
  getItem: get,
  setItem: set,
  removeItem: del,
}))
