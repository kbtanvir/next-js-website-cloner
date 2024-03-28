import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type CustomImageProps = {
  className?: string;
  src?: string;
  imageClassName?: string;
};

const CustomImage = React.forwardRef<HTMLDivElement, CustomImageProps>(
  ({ className, src, imageClassName, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative  size-10  overflow-hidden", className)}
      {...props}
    >
      <Image
        src={src || ""}
        fill
        alt=""
        className={cn("z-0 object-cover object-top", imageClassName)}
      />
    </div>
  ),
);

CustomImage.displayName = "Image";

export { CustomImage };
