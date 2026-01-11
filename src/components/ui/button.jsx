import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(({
  className,
  variant = "default",
  size = "default",
  ...props
}, ref) => {
  const variantMap = {
    default: "btn-primary",
    outline: "btn-outline",
    ghost: "btn-ghost",
    white: "btn-white-primary",
  };

  const variantClass = variantMap[variant] || variantMap.default;

  const sizeMap = {
    default: "btn-md",
    sm: "btn-sm",
    lg: "btn-lg",
  };

  const sizeClass = sizeMap[size] || sizeMap.default;

  const Comp = props.href ? "a" : "button";

  return (
    <Comp
      className={cn("btn", variantClass, sizeClass, className)}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
