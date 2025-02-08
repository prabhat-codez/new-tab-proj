import { motion } from "framer-motion"
import { Suspense, lazy, useEffect, useState } from "react"
import Button from "~/components/ui/button"
import { useOptionsStore } from "~/store/options"
import { useSidebarOptions } from "../sidebar-store"
import AppOptions from "./app-options"
import ClockOptions from "./clock-options"
import GalleryOptions from "./gallery-options"
import GeneralOptions from "./general-options"
import MiscOptions from "./misc-options"
import WeatherOptions from "./weather-options"

const AIToolsTab = lazy(() => import("./tabs/ai-tools"))
const DockOptions = lazy(() => import("./dock-options"))
const GalleryTab = lazy(() => import("./gallery-options/gallery-tab"))
const SearchEnginesTab = lazy(() => import("./tabs/search-engines"))

const MotionDiv = ({
  children,
  direction = "right",
}: {
  children: React.ReactNode
  direction?: "right" | "left"
}) => {
  const x = 280
  return (
    <motion.div
      initial={{ x: direction === "right" ? x : -x, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-full w-full space-y-10"
    >
      {children}
    </motion.div>
  )
}

const SidebarOptions = () => {
  const tab = useSidebarOptions((s) => s.tab)
  const restoreDefaults = useOptionsStore((s) => s.restoreDefaults)

  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    setIsOpen(true)
    return () => setIsOpen(false)
  }, [])

  return (
    <Suspense>
      {tab === "default" && (
        <MotionDiv direction={isOpen ? "left" : "right"}>
          <GeneralOptions />
          <ClockOptions />
          <AppOptions />
          <MiscOptions />
          <GalleryOptions />
          <WeatherOptions />
          <Button
            variant="accent"
            className="ml-auto"
            onClick={restoreDefaults}
          >
            Restore Defaults
          </Button>
        </MotionDiv>
      )}
      {tab === "search-engines" && (
        <MotionDiv>
          <SearchEnginesTab />
        </MotionDiv>
      )}
      {tab === "apps" && (
        <MotionDiv>
          <DockOptions />
        </MotionDiv>
      )}
      {tab === "ai-tools" && (
        <MotionDiv>
          <AIToolsTab />
        </MotionDiv>
      )}
      {tab === "gallery" && (
        <MotionDiv>
          <GalleryTab />
        </MotionDiv>
      )}
    </Suspense>
  )
}

export default SidebarOptions
