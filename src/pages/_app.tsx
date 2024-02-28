import { RootLayout } from "@/components/layouts/RootLayout";
import { Toaster } from "@/components/ui/toaster";

import { cartStore } from "@/features/cart/controller/store";
import { persistStore } from "@/lib/persist";
import { api } from "@/utils/api";
import { type Session } from "next-auth";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { type AppType } from "next/app";
import { Inter as FontSans } from "next/font/google";

import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import "@/styles/globals.css";
import { useRouter } from "next/router";

persistStore(cartStore, "CART");

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <SessionProvider session={session}>
        <style jsx global>{`
          :root {
            --font-sans: ${fontSans.style.fontFamily};
          }
        `}</style>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LayoutRouter component={Component} pageProps={pageProps} />
          <Toaster />
        </ThemeProvider>
      </SessionProvider>
      {/* <Analytics /> */}
    </>
  );
};

export default api.withTRPC(MyApp);

function LayoutRouter({
  component: Component,
  pageProps,
}: {
  component: any;
  pageProps: any;
}) {
  const router = useRouter();

  if (router.pathname.startsWith("/sites/eshopper")) {
    return (
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    );
  }

  if (router.pathname.startsWith("/admin")) {
    return (
      <AdminLayout>
        <PageTitle />
        <Component {...pageProps} />
      </AdminLayout>
    );
  }

  return <Component {...pageProps} />;
}

function PageTitle() {
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
