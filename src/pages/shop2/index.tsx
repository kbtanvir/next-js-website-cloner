import {
  ContentSection,
  FooterSection,
  MainHeader,
  NavigationSection,
  TopBar,
} from "../../../features/shop/view/page"

export default function ShopPage() {
  return (
    <div>
      <TopBar />
      <MainHeader />
      <NavigationSection />
      <ContentSection />
      <FooterSection />
    </div>
  )
}
