import MainHeader from "./header/MainHeader"
import { NavigationSection, TopBar } from "./header/header"
import { FooterSection } from "@/components/footer"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <TopBar />
      <MainHeader />
      <NavigationSection />
      <>{children}</>
      <FooterSection />
    </>
  )
}
