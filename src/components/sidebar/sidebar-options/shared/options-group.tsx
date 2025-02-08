interface OptionsGroupProps {
  title: string
  children: React.ReactNode
}

const OptionsGroup = ({ title, children }: OptionsGroupProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <span className="font-medium text-destructive text-sm">{title}</span>
      {children}
    </div>
  )
}

export default OptionsGroup
