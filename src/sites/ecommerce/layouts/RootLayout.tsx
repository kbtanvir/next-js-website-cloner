import { cartService } from "@/features/cart/controller/service";
import { useCartStore } from "@/features/cart/controller/store";
import { api } from "@/utils/api";
import { useEffect } from "react";
import { FooterSection } from "../footer/footer";
import MainHeader, { NavigationSection } from "../header";

interface LayoutProps {
  children: React.ReactNode;
}

export function EcomLayout({ children }: LayoutProps) {
  const cartState = useCartStore();

  const query = api.cart.syncCart.useQuery(
    cartState.cart.map((item) => item.id),
    {
      refetchOnMount: true,
    },
  );

  useEffect(() => {
    if (query.isLoading) return;
    if (query.data) return cartService.syncCart(query.data);

    cartService.clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.isLoading]);

  return (
    <>
      <MainHeader />
      <NavigationSection />
      <>{children}</>
      <FooterSection />
    </>
  );
}
