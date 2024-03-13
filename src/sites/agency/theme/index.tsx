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
  textColor: `text-[#12D176]`,
  span: `[&>span]:text-[#12D176] [&>span]:underline [&>span]:font-light`,
  textHoverColor: `hover:text-[#12D176]`,
  bgColor: `bg-[#12D176]`,
  hoverBg: `hover:bg-[#12D176]`,
  ringColor: `ring-[#12D176]`,
  linkMobileHover: `hover:border-b-[#12D176]`,
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
        `font-semibold transition-all ${classes.textHoverColor}`,
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
        "relative flex items-center gap-4 text-[16px] font-bold uppercase max-sm:text-[14px]",
        className,
      )}
    >
      {/* <span
        className="size-2 rounded-full"
        style={{
          backgroundColor: colors.hover,
        }}
      /> */}
      {children}

      <span
        className=" size-2 rounded-full"
        style={{
          backgroundColor: colors.hover,
        }}
      />
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
        `text-[54px] font-bold capitalize leading-[1.3em] max-sm:text-[28px] max-sm:leading-normal`,
        classes.span,
        className,
      )}
    >
      {children}
    </h2>
  );
}
