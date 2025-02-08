import { Icon, disableCache, enableCache } from "@iconify/react"
import clsx from "clsx"
import { motion } from "framer-motion"
import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import Button from "~/components/ui/button"
import Input from "~/components/ui/input"
import Modal from "~/components/ui/modal"
import type { App } from "~/lib/variables"
import { useAppStore } from "~/store/app-store"
import type { Setter } from "~/types/react"

const IconPreview = (props: {
  url: string
  icon: string
  btnFunc: () => void
}) => {
  const [debouncedUrl] = useDebounceValue(props.url, 300)
  const [debouncedIcon] = useDebounceValue(props.icon, 300)

  return (
    <motion.span
      layoutId="app-preview-icon"
      className="relative z-10 flex size-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-background p-4"
    >
      {!props.icon ? (
        <img
          src={`https://www.google.com/s2/favicons?domain=${debouncedUrl}&sz=128`}
          alt="website-favicon"
          width={40}
        />
      ) : (
        <Icon icon={debouncedIcon} fontSize={30} className="text-foreground" />
      )}
      <Button
        variant="accent"
        icon="tabler:pencil"
        iconSize={18}
        onClick={props.btnFunc}
        className="absolute right-3 bottom-3 size-6 flex-shrink-0 p-0"
      />
    </motion.span>
  )
}

interface AppFormProps {
  isOpen: boolean
  setIsOpen: Setter<boolean>
  app?: App | null
}

const AppForm = ({ isOpen, setIsOpen, app }: AppFormProps) => {
  // Store functions
  const { addDrawerApp, updateDrawerApp } = useAppStore()

  // Modal vars
  const [modalTitle, setModalTitle] = useState("Add app")

  // Form vars
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [icon, setIcon] = useState("")
  const [isIconInput, setIsIconInput] = useState(true)

  const submitHandler = () => {
    if (!name || !url) return

    if (!app) {
      addDrawerApp({
        id: nanoid(),
        name,
        url,
        icon: !icon ? `webicon:${url}` : icon,
      })
    } else {
      updateDrawerApp(app.id, { id: app.id, name, url, icon: app.icon })
    }
    setIsOpen(false)
  }

  useEffect(() => {
    // Do not cache iconify icons while adding/updating apps
    if (isOpen) {
      disableCache("all")
    }
    return () => enableCache("local")
  }, [isOpen])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    timeoutId = setTimeout(() => {
      setName("")
      setUrl("")
      setIcon("")
      setModalTitle("Add app")
      setIsIconInput(false)
    }, 400)

    if (app) {
      clearTimeout(timeoutId)

      setName(app.name)
      setUrl(app.url)
      setIcon(app.icon)
      setModalTitle("Update app")
      setIsIconInput(true)
      return
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [app])

  return (
    <Modal
      // title={!app ? "Add App" : "Update app"}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      btnFunc={submitHandler}
      btnDisabled={!name || !url || (app?.name === name && app?.url === url)}
    >
      <div
        className={clsx(
          "flex gap-3",
          isIconInput ? "items-start" : "items-center",
        )}
      >
        {(url || icon) && (
          <div className="flex justify-center gap-3 pt-8">
            <IconPreview
              icon={icon}
              url={url}
              btnFunc={() => setIsIconInput((prev) => !prev)}
            />
          </div>
        )}

        <motion.div
          initial={{ x: -20, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ ease: "linear" }}
          className="w-full"
        >
          <h3 className="pb-3 font-medium text-sm">{modalTitle}</h3>
          {isIconInput && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Input
                id="add-app-icon"
                value={icon}
                onInput={(e) => setIcon(e.currentTarget.value)}
                placeholder="e.g. solar:gallery-bold"
                className="mb-2 h-11"
              />
            </motion.span>
          )}
          <motion.div layoutId="fucker" className="space-y-2">
            <Input
              id="add-app-name"
              value={name}
              onInput={(e) => setName(e.currentTarget.value)}
              placeholder="e.g. Wallhaven"
              className="h-11"
            />
            <Input
              id="add-app-url"
              value={url}
              onInput={(e) => setUrl(e.currentTarget.value)}
              placeholder="e.g. https://wallhaven.cc"
              className="h-11"
            />
          </motion.div>
        </motion.div>
      </div>
    </Modal>
  )
}

export default AppForm
