import { useAppStore } from "~/store/app-store"
import Button from "../ui/button"

const Dock = () => {
  const dockApps = useAppStore((s) => s.dockApps)

  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-center gap-3 p-4">
      {dockApps.map(({ id, url, icon, name }) => (
        <Button
          key={`dock-app-${id || name}`}
          onClick={() => window.open(`https://${url}`, "_blank")}
          icon={icon}
          size="icon"
          className="hover:-translate-y-1 size-12 transition-transform"
          iconSize={26}
        />
      ))}
    </div>
  )
}

export default Dock
