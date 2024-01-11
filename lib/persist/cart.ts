import { withDevToolsExtention } from "./withDevtoolExtension"
import { createStore } from "@poly-state/poly-state"
import { useStore } from "@poly-state/react"
import { type Product } from "@prisma/client"

export type ICartStore = {
  cartItems: Partial<Product>[]
  total: number
}

export const initialState: ICartStore = {
  cartItems: [],
  total: 0,
}

export const cartStore = createStore<ICartStore>(initialState)

export const useCartStore = () => useStore<ICartStore>(cartStore)

if (process.env.NODE_ENV === "development") {
  withDevToolsExtention(cartStore, "CART")
}
