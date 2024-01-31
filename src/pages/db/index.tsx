import { Button } from "@/components/ui/button"
import { useInfiniteProductQuery } from "@/hooks/query"
import { type Product } from "@prisma/client"
import { api } from "~/utils/api"

export default function ShopPage() {
  const query = useInfiniteProductQuery()

  const actionQuery = api.product.addFakeProducts.useMutation({
    onSuccess: async () => {
      await query.refetch()
    },
  })
  const deleteAll = api.product.deleteAll.useMutation({
    onSuccess: async () => {
      await query.refetch()
      // await cartSyncQuery.refetch()
    },
  })

  return (
    <div className="container">
      <Button
        className="mb-20"
        onClick={async () => {
          await actionQuery.mutateAsync()
        }}
      >
        Add fake data
      </Button>
      <Button
        className="mb-20"
        onClick={async () => {
          await deleteAll.mutateAsync()
        }}
      >
        Delete all
      </Button>

      <ProductFetcher
        query={query}
        data={query.data?.pages.map((page) => page.products).flat() ?? []}
      />

      {query.hasNextPage && (
        <Button
          onClick={async () => {
            await query.fetchNextPage()
          }}
        >
          Loadmore
        </Button>
      )}
    </div>
  )
}

function ProductFetcher({
  data,
  query,
}: {
  data: Partial<Product>[]
  query: ReturnType<typeof useInfiniteProductQuery>
}) {
  if (query.error) {
    return <div>{query.error.message}</div>
  }

  if (query.isLoading) {
    return <div>Loading...</div>
  }

  if (!query.data) {
    return <div>No data</div>
  }

  return (
    // <div className="w-full grid grid-cols-1 gap-x-12 gap-y-12 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <div className="w-full overflow-hidden">
      <div
        className="grid gap-x-12 gap-y-12 items-center"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {/* {fakeProducts.length} */}
        {/* {JSON.stringify(query.data, null, 2)} */}
        {data.length}
      </div>
    </div>
  )
}
