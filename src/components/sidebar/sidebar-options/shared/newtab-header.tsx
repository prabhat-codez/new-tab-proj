import Button from "../../../ui/button"
import { useSidebarOptions } from "../../sidebar-store"

interface NewTabHeader {
  rightButtons?: React.ReactNode
}

const NewTabHeader = ({ rightButtons }: NewTabHeader) => {
  const setTab = useSidebarOptions((s) => s.setTab)
  return (
    <div className="inline-flex w-full items-center justify-between">
      <Button
        variant="secondary"
        size="icon"
        iconSize={20}
        icon="mingcute:left-line"
        onClick={() => setTab("default")}
      />
      <div className="flex space-x-2">{rightButtons}</div>
    </div>
  )
}

export default NewTabHeader
