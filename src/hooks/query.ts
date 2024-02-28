import { api } from "@/utils/api";

export type QueryParams = {
  sort: "newest" | "top" | "oldest";
  time: "day" | "week";
};

export function useInfiniteProductQuery() {
  return api.product.infiniteProducts.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );
}
export function useDeleteAllQuery() {
  return api.product.deleteAll.useMutation();
}
export function useAddFakeQuery() {
  return api.product.addFakeProducts.useMutation();
}
