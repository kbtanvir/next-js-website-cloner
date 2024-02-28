 
import { createStore, withDevTools } from "@poly-state/poly-state"
import { useStore } from "@poly-state/react"
import { type Product } from "@prisma/client"

export type IOrderItem = {
  id: string
  qty: number
  product: Product
}

export type IOrderStore = {
  Order: IOrderItem[]
  total: number
}

export const initialState: IOrderStore = {
  Order: [],
  total: 0,
}

export const orderStore = createStore<IOrderStore>(initialState)

export const useOrderStore = () => useStore<IOrderStore>(orderStore)

if (process.env.NODE_ENV === "development") {
  withDevTools(orderStore, "CART")
}
