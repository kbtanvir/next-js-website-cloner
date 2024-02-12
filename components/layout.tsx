import MainHeader from "./header/MainHeader"
import { NavigationSection, TopBar } from "./header/header"
import { FooterSection } from "@/components/footer"
import { cartService } from "@/features/cart/controller/service"
import { useCartStore } from "@/features/cart/controller/store"
import { useEffect } from "react"
import { api } from "~/utils/api"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const cartState = useCartStore()

  const query = api.cart.syncCart.useQuery(
    cartState.cart.map((item) => item.id),{
      refetchOnMount: true,
    }
  )

  useEffect(() => {
    if (query.isLoading) return
    if (query.data) {
      return cartService.syncCart(query.data)
    }
    cartService.clearCart()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.isLoading])

  return (
    <>
      {/* <TopBar /> */}
      <MainHeader />
      <NavigationSection />
      <>{children}</>
      <FooterSection />
    </>
  )
}
