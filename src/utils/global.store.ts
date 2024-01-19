import { type IProductQueryInput } from "@/features/shop/model"
import { createStore, withDevTools } from "@poly-state/core"
import { useStore } from "@poly-state/react"

// import { demoTM } from '../data/demo'

export type GlobalStore = {
  productsQueryDTO: IProductQueryInput
  productCounts: {
    total: number
    inStock: number
    productsInSizesCounts: {
      [key: string]: number
    }
  }
}

export const initialStore: GlobalStore = {
  productsQueryDTO: {
    sort: "createdAt_desc",
  },
  productCounts: {
    total: 0,
    inStock: 0,
    productsInSizesCounts: {},
  },
}

export const globalStore = createStore(initialStore)

export const useGlobalStore = () => useStore<GlobalStore>(globalStore)

if (process.env.NODE_ENV === "development") {
  withDevTools(globalStore, "GOBAL_STORE")
}
