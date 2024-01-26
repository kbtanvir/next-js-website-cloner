import { withDevToolsExtention } from "../../../lib/persist/withDevtoolExtension"
import { createStore } from "@poly-state/poly-state"
import { useStore } from "@poly-state/react"
import { type Cart } from "@prisma/client"

export type ICartStore = {
  cart: Cart[]
  total: number
}

export const initialState: ICartStore = {
  cart: [],
  total: 0,
}

export const cartStore = createStore<ICartStore>(initialState)

export const useCartStore = () => useStore<ICartStore>(cartStore)

if (process.env.NODE_ENV === "development") {
  withDevToolsExtention(cartStore, "CART")
}
