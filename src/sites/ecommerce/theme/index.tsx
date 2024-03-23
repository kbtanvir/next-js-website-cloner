import { cn } from "@/lib/utils";

export const colors = {
  text: "#fff",
  hover: "#12D176",
  orange: "#FF9700",
  green: "#12D176",
  red: "#ec24babe",
  blue: "#007FF4",
  green2: "#005F73",
} as const;

export const classes = {
  textColor: `text-emerald-600`,
  span: `[&>span]:text-emerald-600 [&>span]:font-bold`,
  textHoverColor: `hover:text-emerald-600`,
  bgColor: `bg-emerald-600`,
  hoverBg: `hover:bg-emerald-600`,
  ringColor: `ring-emerald-600`,
  linkMobileHover: `hover:border-b-emerald-600`,
};

export function LinkText({
  children = <>This is a link</>,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        `cursor-pointer  transition-all ${classes.textHoverColor}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
export function Heading3({
  children = <>This is heading 3</>,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "relative flex  gap-4 text-[16px] max-sm:text-[14px]",
        className,
      )}
    >
      {children}
    </h3>
  );
}
export function Heading2({
  children = <>This is heading 2</>,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        `text-[34px]  font-light capitalize leading-[1.3em] max-sm:text-[28px]  max-sm:leading-normal`,
        classes.span,
        className,
      )}
    >
      {children}
    </h2>
  );
}
