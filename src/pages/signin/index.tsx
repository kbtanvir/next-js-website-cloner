import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export const metadata = {
  title: "Sign in",
  description: "Sign in to get started.",
};

export default function SignInPage() {
  return (
    <div className=" ">
      <Link href={"/"} className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost">
          <ChevronLeft className="mr-1 h-4 w-4" /> Home
        </Button>
      </Link>
      <div className="rounded-md bg-slate-100 p-4 shadow-md dark:bg-slate-950 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Please signin to continue
            </h1>
          </div>
          <Button onClick={() => signIn("google")}>Signin with google</Button>
          <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400">
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
