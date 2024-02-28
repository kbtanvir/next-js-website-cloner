import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export function AdminHeader() {
  const router = useRouter();
  const session = useSession();
  return (
    <div className="grid place-items-center gap-10">
      <div className="text-center text-xl font-bold">
        {router.pathname === "/" ? "Home" : router.pathname.slice(1)}
      </div>
      <div className="flex gap-5">
        <Button
          onClick={() => {
            router.back();
          }}
        >
          Go back
        </Button>
        {session.data ? (
          <Button onClick={() => signOut()}>
            {session.data.user.email} : Signout
          </Button>
        ) : (
          <Button onClick={() => signIn("google")}>Signin</Button>
        )}
      </div>
    </div>
  );
}
