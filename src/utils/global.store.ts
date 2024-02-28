import { type IProductQueryInput } from "@/features/shop/model";
import { createStore } from "@poly-state/poly-state";

import { useStore } from "@poly-state/react";

// import { demoTM } from '../data/demo'
export const featuredProductActiveTab = [
  "createdAt",
  "popularity",
  "sale",
] as const;
export type GlobalStore = {
  productsQueryDTO: IProductQueryInput;
  columnSize: number;
  inStockTotal: number;
  sizesTotal: Record<string, number>;
  wishlistTotal: number;
  cartTotal: number;
  showSidebar: boolean;
  featuredProductActiveTab: (typeof featuredProductActiveTab)[number];
};

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
  showSidebar: true,
  featuredProductActiveTab: "createdAt",
};

export const globalStore = createStore(initialStore);

// if (process.env.NODE_ENV === "development") {
//   withDevTools(globalStore, "GOBAL_STORE");
// }

export const useGlobalStore = () => useStore<GlobalStore>(globalStore);
