import { View } from "@/sites/ai-image-gen/home";

export const sitePath = "/sites/ai-image-gen";

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

export const imageRoute = "/sites/ai-image-gen";

export default function Page() {
  return <View />;
}
