import { Toaster } from "@/components/ui/toaster";
import { EcomLayout } from "@/sites/ecommerce/layouts/RootLayout";

import { cartStore } from "@/features/cart/controller/store";
import { persistStore } from "@/lib/persist";
import { api } from "@/utils/api";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { type AppType } from "next/app";
import { Inter as FontSans } from "next/font/google";

import AdminLayout from "@/sites/admin/layouts/AdminLayout";
import { AiImageGenLayout } from "@/sites/ai-image-gen/layouts/RootLayout";
import { RealEstateLayout } from "@/sites/real-estate/layouts/RootLayout";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { AdminHeader } from "../sites/admin/header/AdminHeader";

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
      <EcomLayout>
        <Component {...pageProps} />
      </EcomLayout>
    );
  }
  if (router.pathname.startsWith("/sites/real-estate")) {
    return (
      <RealEstateLayout>
        <Component {...pageProps} />
      </RealEstateLayout>
    );
  }
  if (router.pathname.startsWith("/sites/ai-image-gen")) {
    return (
      <AiImageGenLayout>
        <Component {...pageProps} />
      </AiImageGenLayout>
    );
  }

  if (router.pathname.startsWith("/admin")) {
    return (
      <AdminLayout>
        <AdminHeader />
        <Component {...pageProps} />
      </AdminLayout>
    );
  }

  return <Component {...pageProps} />;
}
