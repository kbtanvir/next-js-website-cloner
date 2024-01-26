import { type IProductQueryInput } from "@/features/shop/model"
import { createStore, withDevTools } from "@poly-state/core"
import { useStore } from "@poly-state/react"

// import { demoTM } from '../data/demo'

export type GlobalStore = {
  productsQueryDTO: IProductQueryInput
  columnSize: number
  inStockTotal: number
  sizesTotal: Record<string, number>
  wishlistTotal: number
  cartTotal: number
}

export const initialStore: GlobalStore = {
  productsQueryDTO: {
    sort: "createdAt_asc",
    limit: 20,
  },
  columnSize: 4,
  inStockTotal: 0,
  sizesTotal: {},
  wishlistTotal: 0,
  cartTotal: 0,
}

export const globalStore = createStore(initialStore)

export const useGlobalStore = () => useStore<GlobalStore>(globalStore)

if (process.env.NODE_ENV === "development") {
  withDevTools(globalStore, "GOBAL_STORE")
}
