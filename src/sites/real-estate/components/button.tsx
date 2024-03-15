import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { classes } from "../theme";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm max-sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 max-sm:max-w-auto  ",
  {
    variants: {
      variant: {
        default: `h-[50px]  max-sm:max-h-[40px] max-sm:px-4  min-w-[200px] text-black max-sm:min-w-full  bg-transparent px-5 font-bold uppercase max-sm:min-w-[180px] ring-[3px] ${classes.ringColor} ${classes.buttonBG} ${classes.buttonHover}`,

        outline: `h-[50px] max-sm:max-h-[40px] max-sm:px-4 max-sm:text-sm max-sm:max-w-auto min-w-[200px] text-black rounded-full bg-transparent px-5 font-bold uppercase ring-[3px] ${classes.ringColor} hover:bg-slate-900 hover:text-white [&>.icon]:hover:text-white flex-center gap-2 max-sm:min-w-[180px]`,

        icon: `flex-center size-12 max-sm:size-10 rounded-[100%] bg-transparent hover:bg-transparent text-white  p-0 ring-[3px] ${classes.ringColor} bg-black text-[30px]   px-0 py-0   max-sm:text-xl   hover:text-black`,

        link: `${classes.textHoverColor}  text-base `,
      },
      size: {
        default: ``,
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
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
