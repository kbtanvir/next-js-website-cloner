"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import * as React from "react";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { data } = useSession();

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="text-wrap">
        {JSON.stringify(data?.user.email, null, 2)}
      </div>
      <Button onClick={() => signIn("google")}>Signin with google</Button>
      <Button
        onClick={async () => {
          await signOut();
        }}
      >
        Signout
      </Button>
    </div>
  );
}
