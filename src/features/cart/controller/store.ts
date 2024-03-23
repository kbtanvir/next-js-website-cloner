import { createStore } from "@poly-state/poly-state";
import { useStore } from "@poly-state/react";
import { type Product } from "@prisma/client";

export type ICartItem = {
  id: string;
  qty: number;
  product: Product;
};

export type ICartStore = {
  cart: ICartItem[];
  total: number;
};

export const initialState: ICartStore = {
  cart: [],
  total: 0,
};

export const cartStore = createStore<ICartStore>(initialState);

// if (process.env.NODE_ENV === "development") {
//   withDevTools(cartStore, "CART");
// }

export const useCartStore = () => useStore<ICartStore>(cartStore);
