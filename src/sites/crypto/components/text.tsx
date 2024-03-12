import { cn } from "@/lib/utils";
import React from "react";

const Text = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-gray-400 max-sm:text-[14px]", className)}
    {...props}
  />
));

Text.displayName = "Text";

export { Text };
