import { MobileSidebar } from "@/components/admin-layout/mobile-sidebar";
import { ThemeToggle } from "@/components/admin-layout/theme-toggle";
import { UserNav } from "@/components/admin-layout/user-nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Boxes } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: sessionData } = useSession();
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link
          href={"/"}
          className="hidden items-center justify-between gap-2 md:flex"
        >
          <Boxes className="h-6 w-6" />
          <h1 className="text-lg font-semibold">T3 app template</h1>
        </Link>
        <div className={cn("block md:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {sessionData?.user ? (
            <UserNav user={sessionData.user} />
          ) : (
            <Button
              variant="default"
              className="text-sm"
              onClick={() => {
                void signIn();
              }}
            >
              Sign In
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}
