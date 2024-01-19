import { type IProductQueryInput } from "@/features/shop/model"
import { createStore, withDevTools } from "@poly-state/core"
import { useStore } from "@poly-state/react"

// import { demoTM } from '../data/demo'

export type GlobalStore = {
  totalProducts: number
  productsQueryDTO: IProductQueryInput
}

export const initialStore: GlobalStore = {
  totalProducts: 0,
  productsQueryDTO: {
    inStock: false,
  },
}

export const globalStore = createStore(initialStore)

export const useGlobalStore = () => useStore<GlobalStore>(globalStore)

if (process.env.NODE_ENV === "development") {
  withDevTools(globalStore, "GOBAL_STORE")
}
