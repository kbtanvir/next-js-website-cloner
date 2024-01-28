import { ProductItem } from "../../../components/ProductItem"
import { Breadcrumb } from "../../../components/header"
import { type IProduct } from "../model"
import { PageTitle } from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/features/shop/view/sidebar"
import { type Products } from "@prisma/client"
import { useEffect, useState } from "react"
import { api } from "~/utils/api"
import { useGlobalStore } from "~/utils/global.store"

function ProductGrid() {
  const [data, setData] = useState<Products[]>([])

  const { productsQueryDTO, columnSize } = useGlobalStore()
  const infiniteQuery = api.product.infiniteProducts.useInfiniteQuery(
    productsQueryDTO,
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
    }
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        await infiniteQuery.refetch()
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    void fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(productsQueryDTO)])

  useEffect(() => {
    const data =
      infiniteQuery.data?.pages.map((page) => page.products).flat() ?? []
    setData(data)
    console.log(data)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infiniteQuery.data])

  if (infiniteQuery.error) {
    return <div>{infiniteQuery.error.message}</div>
  }

  if (infiniteQuery.isLoading) {
    return <div>Loading...</div>
  }

  if (!infiniteQuery.data) {
    return <div>No data</div>
  }

  return (
    <div className="w-full flex flex-col gap-10">
      <div
        className={`grid gap-8 w-full`}
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(250px, 250px))`,
        }}
      >
        {data.map((item, i) => (
          <ProductItem
            key={item.id}
            item={item as IProduct}
            refetch={infiniteQuery.refetch}
          />
        ))}
      </div>
      {infiniteQuery.hasNextPage && (
        <Button
          className="self-start"
          onClick={async () => {
            await infiniteQuery.fetchNextPage()
          }}
        >
          Loadmore
        </Button>
      )}
      {/* TODO: add pagination */}
    </div>
  )
}
function Pagination() {
  return (
    <span className="w-full mt-20 flex  gap-5 self-start max-md:mt-10">
      {[1, 2, 3, 4].map((_, i) => (
        <span className="aspect-square bg-slate-100 w-10 flex-center" key={i}>
          {_}
        </span>
      ))}
    </span>
  )
}
export function PageContent() {
  return (
    <span className="mx-auto w-full">
      <Breadcrumb />
      <PageTitle />
      <div className="mt-20">
        <div className="flex max-w-[1500px] w-full mx-auto  justify-between gap-10">
          <Sidebar />

          <ProductGrid />
        </div>
      </div>
    </span>
  )
}
