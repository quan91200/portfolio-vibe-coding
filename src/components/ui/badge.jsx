import { cn } from "@/lib/utils"

function Badge({ className, variant = "default", ...props }) {
  const variantClass = variant === "outline" ? "bg-transparent" : "bg-secondary";
  return (
    <div className={cn("badge", variantClass, className)} {...props} />
  )
}

export { Badge }
