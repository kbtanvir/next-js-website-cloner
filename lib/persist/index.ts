import { type ReturnStoreType } from "@poly-state/poly-state"

export const persistStore = (
  store: ReturnStoreType<any>,
  identifier: string
) => {
  if (typeof window === "undefined") return
  const storeValue = localStorage.getItem(`STORE_${identifier}`)

  if (storeValue) {
    store.hydrate(JSON.parse(storeValue))
  }

  store.subscribe((state) =>
    localStorage.setItem(`STORE_${identifier}`, JSON.stringify(state))
  )
}
