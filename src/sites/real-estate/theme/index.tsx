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
  textColor: `text-purple-600`,
  span: `[&>span]:text-purple-600 [&>span]:underline [&>span]:font-bold`,
  textHoverColor: `hover:text-purple-600`,
  buttonBG: `bg-slate-900 text-white`,
  buttonHover: `hover:bg-transparent hover:text-black hover:ring-slate-900`,
  ringColor: `ring-slate-900`,
  linkMobileHover: `hover:border-b-purple-600`,
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
        `cursor-pointer transition-all ${classes.textHoverColor}`,
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
        `text-[44px] font-light capitalize leading-[1.3em] max-sm:text-[28px] max-sm:leading-normal`,
        classes.span,
        className,
      )}
    >
      {children}
    </h2>
  );
}
