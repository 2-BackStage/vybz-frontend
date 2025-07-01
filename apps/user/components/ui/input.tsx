import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => (
    <input ref={ref} className={`block w-full rounded border px-3 py-2 bg-white text-black ${className}`} {...props} />
  )
);
Input.displayName = "Input"; 