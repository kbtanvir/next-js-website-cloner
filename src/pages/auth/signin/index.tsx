import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export const metadata = {
  title: "Sign in",
  description: "Sign in to get started.",
};

export default function SignInPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:px-0">
      <Link
        href={siteNavigation.agency.home.path}
        className="absolute left-4 top-4 md:left-8 md:top-8"
      >
        <Button variant="ghost">
          <ChevronLeft className="mr-1 h-4 w-4" /> Home
        </Button>
      </Link>
      <div className="rounded-md bg-slate-100 p-4 shadow-md dark:bg-slate-950 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}

export function UserAuthForm() {
  const { data } = useSession();

  return (
    <div className={"grid place-items-center gap-6"}>
      <div className="text-wrap">
        {JSON.stringify(data?.user.email, null, 2)}
      </div>
      <Button onClick={() => signIn("google")}>Signin with google</Button>
    </div>
  );
}
