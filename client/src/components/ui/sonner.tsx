import { useTheme } from "next-themes"
import { Toaster as Sonner} from "sonner"

interface ToasterProps {
  theme?: "light" | "dark"
  position?: "top-left" | "top-center" | "top-right"
}

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
