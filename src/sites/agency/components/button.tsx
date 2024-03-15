import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { classes } from "../theme";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-full",
  {
    variants: {
      variant: {
        default: `max-sm:px-4 max-sm:text-sm  max-sm:min-w-0 min-w-[200px] text-black rounded-full bg-transparent px-5 font-bold uppercase ring-[3px] ${classes.ringColor}  ${classes.bgColor}   hover:bg-transparent`,

        outline: `max-sm:px-4 max-sm:text-sm  max-sm:min-w-0 min-w-[200px] text-black rounded-full bg-transparent px-5 font-bold uppercase ring-[3px] ${classes.ringColor}   ${classes.hoverBg} hover:text-white`,

        link: "px-0 max-sm:text-sm text-black uppercase underline-offset-4 hover:underline",
      },
      size: {
        default: `h-[50px] px-4 py-2 max-sm:h-[40px]`,
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "size-10",
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
