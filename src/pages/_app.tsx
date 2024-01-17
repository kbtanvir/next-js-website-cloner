import { BreakpointIndicator } from "@/components/breakpoint-indicator"
import { Layout } from "@/components/layout"
import { Toaster } from "@/components/ui/toaster"
import { persistStore } from "@/lib/persist"
import { cartStore } from "@/lib/persist/cart"
import { Inter as FontSans } from "@next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { type AppType } from "next/app"
import "~/styles/globals.css"
import { api } from "~/utils/api"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

persistStore(cartStore, "CART")

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
