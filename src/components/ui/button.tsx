import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Button variants share a unified size/padding to keep CTA consistency across the site.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-semibold tracking-[0.01em] ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-transparent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-md hover:-translate-y-[2px] hover:scale-[1.02] transition-transform duration-200",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-accent bg-secondary text-secondary-foreground py-3 px-6 sm:hover:border-accent/80 sm:hover:shadow-[0_0_12px_rgba(var(--accent-rgb),0.6)] sm:hover:-translate-y-1 sm:hover:scale-[1.02] sm:hover:bg-accent sm:hover:text-accent-foreground active:scale-[0.97] active:shadow-none",
        secondary:
          "bg-white text-foreground border border-primary/20 shadow-sm hover:bg-neutral-100 hover:-translate-y-[2px] hover:scale-[1.02] transition-transform duration-200",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:ring-1 hover:ring-border",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // Unified sizing so every button feels consistent across the site.
        default: "px-6 py-3",
        sm: "px-6 py-3",
        lg: "px-6 py-3",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
