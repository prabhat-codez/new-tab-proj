import { motion } from "framer-motion"
import SidebarOptions from "./sidebar-options"

const SidebarContent = () => {
  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="fixed top-0 right-0 z-20 h-full w-96 select-none p-1 font-rubik"
    >
      <div className="flex h-full w-full flex-col rounded-xl bg-card p-4 text-card-foreground">
        <span className="pt-3 pb-8 pl-4 font-lora font-thin text-2xl">
          Settings
        </span>
        <div className="inline-flex size-full justify-between overflow-y-auto overflow-x-hidden p-4">
          <SidebarOptions />
        </div>
      </div>
    </motion.div>
  )
}

export default SidebarContent
