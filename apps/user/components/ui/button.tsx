import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost";
  size?: "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant, size, ...props }, ref) => {
    let base = "inline-flex items-center justify-center font-medium transition focus:outline-none";
    if (variant === "ghost") base += " bg-transparent";
    if (size === "icon") base += " w-10 h-10 p-0";
    return (
      <button ref={ref} className={`${base} ${className}`} {...props} />
    );
  }
);
Button.displayName = "Button"; 