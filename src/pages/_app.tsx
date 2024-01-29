import { BreakpointIndicator } from "@/components/breakpoint-indicator";
import { Layout } from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";
import { cartStore } from "@/features/cart/controller/store";
import { persistStore } from "@/lib/persist";
import { Analytics } from "@vercel/analytics/react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { type AppType } from "next/app";
import { Inter as FontSans } from "next/font/google";
import "~/styles/globals.css";
import { api } from "~/utils/api"

persistStore(cartStore, "CART")

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})



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
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Toaster />
        </ThemeProvider>
        <BreakpointIndicator />
      </SessionProvider>
      <Analytics />
    </>
  )
}

export default api.withTRPC(MyApp)