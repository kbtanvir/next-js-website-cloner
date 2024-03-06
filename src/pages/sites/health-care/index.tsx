import View from "@/sites/health-care/home";

export const sitePath = "/sites/health-care";

export const Routes = {
  home: {
    title: "Home",
    path: sitePath,
  },
  shop: {
    title: "shop",
    path: `${sitePath}/shop`,
  },
  cart: {
    title: "cart",
    path: `${sitePath}/cart`,
  },
  checkout: {
    title: "checkout",
    path: `${sitePath}/checkout`,
  },
  orderSuccess: {
    title: "success",
    path: `${sitePath}/order/success`,
  },
};

export const imageRoute = "/sites/health-care";

export default function Page() {
  return <View />;
}
