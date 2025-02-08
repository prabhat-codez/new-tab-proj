import { Icon } from "@iconify/react"
import { type VariantProps, cva } from "class-variance-authority"
import React from "react"
import { useOptionsStore } from "../../store/options"
import { cn } from "../../utils"

const buttonVariants = cva(
  "button active:scale-95 flex items-center justify-center rounded-xl transition-colors duration-300 gap-1 disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-card text-card-foreground hover:bg-card-hover",
        secondary: "bg-background text-foreground hover:bg-card-foreground/10",
        accent: "bg-foreground text-background",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
      },
      size: {
        default: "px-4 h-10",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: string
  iconSize?: number
  customIconComp?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { type, className, children, variant, size, icon, iconSize, ...props },
    ref,
  ) => {
    const isMonochromeEnabled = useOptionsStore((s) => s.isMonochromeIcon)

    return (
      <button
        type={type || "button"}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {icon?.startsWith("webicon:") ? (
          <img
            src={`https://www.google.com/s2/favicons?domain=${icon.split(":")[1]}&sz=128`}
            alt="icon-image"
            width={18}
            style={isMonochromeEnabled ? { filter: "grayscale(100%)" } : {}}
          />
        ) : (
          icon && <Icon icon={icon} fontSize={iconSize} />
        )}
        {children}
      </button>
    )
  },
)

Button.displayName = "button"

export default Button
