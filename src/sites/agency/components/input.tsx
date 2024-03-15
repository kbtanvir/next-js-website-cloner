import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "ring-none flex h-[60px] w-full rounded-md border-input border-slate-700 border-2  bg-white-900 px-5 py-2 text-base text-slate-800 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none   focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:bg-white",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
