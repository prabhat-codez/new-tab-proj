import * as ContextMenu from "@radix-ui/react-context-menu"
import Button from "./button"

interface MenuProps {
  title?: string
  menuTrigger: React.ReactNode
  data: {
    icon: string
    label: string
    func: () => void
    disabled?: boolean
    hidden?: boolean
  }[]
}

const Menu = ({ menuTrigger, title, data }: MenuProps) => {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="ContextMenuTrigger">
        {menuTrigger}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="z-10 min-w-44 select-none space-y-1 rounded-xl border border-card-foreground/20 bg-background p-1 text-black">
          {title && (
            <ContextMenu.Label className="truncate px-4 pt-2 text-destructive text-sm">
              {title}
            </ContextMenu.Label>
          )}
          {data.map((btn) => {
            if (!btn.hidden) {
              return (
                <ContextMenu.Item key={btn.label}>
                  <Button
                    variant="secondary"
                    icon={btn.icon}
                    className="h-9 w-full justify-start"
                    onClick={btn.func}
                    disabled={btn.disabled}
                  >
                    {btn.label}
                  </Button>
                </ContextMenu.Item>
              )
            }
          })}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}

export default Menu
