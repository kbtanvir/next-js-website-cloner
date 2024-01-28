import { MainHeader, NavigationSection, TopBar } from "@/components/header"
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
      <div  >{children}</div>
      <FooterSection />
    </>
  )
}
