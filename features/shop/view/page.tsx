import { ProductItem } from "../../../components/ProductItem"
import { type IProduct } from "../model"
import { PageTitle } from "@/components/header/PageTitle"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/features/shop/view/sidebar"
import { type Product } from "@prisma/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { api } from "~/utils/api"
import { globalStore, useGlobalStore } from "~/utils/global.store"

function ProductGrid() {
  const [data, setData] = useState<Product[]>([])

  const router = useRouter()
  const { productsQueryDTO, columnSize, showSidebar } = useGlobalStore()
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infiniteQuery.data])

  useEffect(() => {
    const { category } = router.query
    const categories = category ? [category as string] : undefined

    return globalStore.setProductsQueryDTO({
      ...productsQueryDTO,
      categories,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  // if (infiniteQuery.error) {
  //   return <div>{infiniteQuery.error.message}</div>
  // }

  if (infiniteQuery.isLoading) {
    return <div>Loading...</div>
  }

  if (!data.length) {
    return <div className="self-start w-full">Nothing found</div>
  }

  return (
    <div className="w-full flex flex-col gap-10">
      <div className={`grid gap-8 w-full autofit-grid-250 `}>
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

export function useMediaQuery({ max = "768px" }) {
  const [query, setQuery] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${max})`)
    setQuery(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setQuery(e.matches)
    mediaQuery.addEventListener("change", handler)

    return () => mediaQuery.removeEventListener("change", handler)
  }, [max])

  return query
}
export function PageContent() {
  const { showSidebar } = useGlobalStore()

  const mobileScreen = useMediaQuery({ max: "768px" })

  useEffect(() => {
    if (mobileScreen) {
      globalStore.setShowSidebar(false)
    } else {
      globalStore.setShowSidebar(true)
    }
  }, [mobileScreen])

  return (
    <div className="mx-auto w-full ">
      <PageTitle />
      <div className="section-px section-py">
        <div className="flex max-w-[1500px] w-full mx-auto  justify-between gap-10">
          {showSidebar && (
            <div className="max-w-[280px] w-full   max-md:fixed z-50 top-0 bg-white left-0 max-md:p-10 max-md:items-stretch max-md:overflow-y-scroll max-md:h-full">
              <Sidebar />
            </div>
          )}

          <ProductGrid />
        </div>
      </div>
    </div>
  )
}
