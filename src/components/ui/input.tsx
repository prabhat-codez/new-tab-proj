import { type VariantProps, cva } from "class-variance-authority"
import React from "react"
import { cn } from "../../utils"

const input = cva(
  "w-full py-2 border-2 focus:border-transparent border-transparent rounded-xl px-4 focus:outline-none focus:ring-2 disabled:opacity-40 text-sm",
  {
    variants: {
      variant: {
        default:
          "bg-background text-foreground focus:ring-foreground placeholder:text-foreground placeholder:opacity-60",
        secondary: "bg-card text-card-foreground focus:ring-foreground",
      },
      outline: {
        ghost: "focus:ring-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {
  isError?: boolean
  errorTxt?: string
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, id, className, label, variant, outline, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {label && (
          <label htmlFor={id} className="ml-1">
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          className={cn(
            input({ variant, outline, className }),
            type === "file" &&
              "input px-2 file:rounded-md file:border-none file:bg-destructive file:px-3 file:py-1.5 file:text-destructive-foreground",
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)

Input.displayName = "Input"

export default Input
