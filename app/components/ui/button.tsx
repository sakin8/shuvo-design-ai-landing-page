// components/ui/button.tsx
import * as React from "react";
import { cn } from "../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-semibold transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2",
          // size
          size === "sm" && "px-3 py-2 text-sm",
          size === "md" && "px-5 py-3 text-base",
          size === "lg" && "px-6 py-4 text-lg",

          // variants
          variant === "default" &&
            "bg-gradient-to-r from-[#00E1FF] to-[#00A8FF] text-black shadow-[0_10px_30px_rgba(0,162,255,0.12)] hover:brightness-95 active:scale-[0.99]",
          variant === "outline" &&
            "bg-transparent border border-[#262626] text-white hover:bg-white/3",
          variant === "ghost" &&
            "bg-transparent text-white hover:bg-white/3",
          variant === "link" &&
            "bg-transparent text-[#00E1FF] underline underline-offset-4 px-0",

          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
