import { OrderByOptions, type IOrderBy, type IProduct } from "../model"
import { Breadcrumb } from "@/components/header"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SortIcon } from "@/lib/icons"
import Image from "next/image"
import { useEffect, useState } from "react"
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io"
import { IoCartOutline, IoGitCompareOutline } from "react-icons/io5"
import { api } from "~/utils/api"
import { globalStore, useGlobalStore } from "~/utils/global.store"

function formatOrderByText(orderBy: IOrderBy) {
  const fields = {
    createdAt_asc: "Newest",
    createdAt_desc: "Oldest",
    price_asc: "Price: Low to High",
    price_desc: "Price: High to Low",
  }

  return fields[orderBy]
}
export function ColumnSizeIcon({ size = 5 }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="text-sm leading-5 text-black">Columns:</span>
      <span className="flex items-center gap-1.5">
        {[2, 3, 4, 5].map((item, i) => (
          <Button
            key={i}
            className={`w-10 h-8 flex gap-1 justify-center ${
              size === item ? "bg-gray-900 text-white" : "bg-white text-black"
            } text-sm  hover:bg-gray-900 hover:text-white px-2 py-0 rounded-md`}
            onClick={() => globalStore.setColumnSize(item)}
          >
            {Array.from({ length: item }).map((_, i) => (
              <span
                key={i}
                className={`w-[1px] h-4 rounded-full ${
                  size === item ? "bg-white" : "bg-gray-900"
                }`}
              />
            ))}
          </Button>
        ))}
      </span>
    </span>
  )
}

function PageTitle() {
  const {
    productCounts,
    productsQueryDTO: { sort, limit },
    columnSize,
  } = useGlobalStore()

  function handleOrderByClick(orderBy: IOrderBy) {
    globalStore.setProductsQueryDTO((s) => ({
      ...s,
      sort: orderBy,
    }))
  }

  return (
    <div className="bg-slate-100 p-6 max-w-[1500px] mx-auto">
      <span className="mx-auto flex  w-full items-center justify-between gap-5 self-stretch max-md:max-w-full max-md:flex-wrap max-md:px-5">
        <div className="my-auto text-2xl font-semibold uppercase leading-8 text-zinc-800">
          Products
        </div>
        <span className="flex items-start justify-between gap-3.5 self-stretch">
          <ColumnSizeIcon size={columnSize} />

          <div className="my-auto self-center text-center text-base leading-5 text-black">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-3 border border-solid border-black border-opacity-10 bg-white px-3.5 py-1.5 text-center text-xs leading-3 text-black">
                <SortIcon />
                <span>{formatOrderByText(sort ?? "createdAt_desc")}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0 border-none">
                {OrderByOptions.map((item, i) => (
                  <DropdownMenuLabel
                    key={i}
                    onClick={() => handleOrderByClick(item)}
                    className={`${
                      sort === item ? "bg-gray-900 text-white" : "bg-white"
                    } hover:bg-gray-900 hover:text-white hover:cursor-pointer `}
                  >
                    {formatOrderByText(item)}
                  </DropdownMenuLabel>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="my-auto grow self-center whitespace-nowrap text-base leading-5 text-black">
            <DropdownMenu>
              <DropdownMenuTrigger
                className="
               border border-solid border-black border-opacity-10 bg-white px-3.5 py-1.5 text-center text-xs leading-3 text-black
              "
              >
                Show {limit}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0 border-none">
                {[10, 20, 50].map((item, i) => (
                  <DropdownMenuLabel
                    key={i}
                    onClick={() =>
                      globalStore.setProductsQueryDTO((s) => ({
                        ...s,
                        limit: item,
                      }))
                    }
                    className={`${
                      limit === item ? "bg-gray-900 text-white" : "bg-white"
                    } hover:bg-gray-900 hover:text-white hover:cursor-pointer `}
                  >
                    {item}
                  </DropdownMenuLabel>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </span>
      </span>
    </div>
  )
}
function ProductItem({
  item,
  onWishRemove,
}: {
  item: IProduct
  onWishRemove: (id: string) => void
}) {
  const mutation = api.product.updateProduct.useMutation({
    onMutate: (data) => {
      console.log(data)
      if (data.wishlist === "remove") {
        onWishRemove(item.id)
      }
    },
  })
  const [inWishList, setinWishList] = useState(!!item.wishlistId)
  const [inCart, setinCart] = useState(!!item.cartId)

  return (
    <div className="flex-col items-stretch w-full max-md:ml-0 max-md:w-full">
      <span className="flex flex-col items-stretch max-md:mt-9 ">
        <div className="relative flex  aspect-[2/2.5] w-full flex-col border-[1px] border-solid border-black ">
          <Image
            loading="lazy"
            src={item.image}
            alt={item.title}
            className="absolute object-cover object-center h-full w-full"
            width={279}
            height={330}
          />

          <div className="flex flex-col w-full items-stretch border  pb-px pt-2.5">
            <div className="flex flex-col items-stretch px-3">
              <span className="absolute mt-1 grid gap-3  items-stretch justify-center ">
                <span className="whitespace-nowrap justify-self-start rounded-md border border-solid border-white border-opacity-10 bg-neutral-900 px-3.5 py-1.5 text-center text-xs leading-3 text-white">
                  -21%
                </span>

                <span className="whitespace-nowrap justify-self-start  flex gap-4 flex-wrap max-w-[200px]">
                  {item.sizes.map((size, i: number) => (
                    <span
                      key={i}
                      className="whitespace-nowrap rounded-md border border-solid border-white border-opacity-10 bg-gray-200 px-1.5 py-1.5 text-center text-xs leading-3 shadow-md text-black font-bold"
                    >
                      {size.name}
                    </span>
                  ))}
                </span>
                {!item.inStock && (
                  <span className="justify-self-start whitespace-nowrap rounded-md border border-solid border-white border-opacity-10 bg-red-600 px-3.5 py-1.5 text-center text-xs leading-3 text-white">
                    {"Out of Stock"}
                  </span>
                )}
              </span>
              <div className="absolute flex flex-col items-center gap-2.5 self-end">
                <span>
                  {mutation.isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
                  ) : (
                    <div
                      className="flex bg-white shadow-lg p-1.5 rounded-lg self-end"
                      onClick={async () => {
                        await mutation.mutateAsync({
                          productId: item.id,
                          wishlist: !!item.wishlistId ? "remove" : "add",
                        })
                        setinWishList(!inWishList)
                      }}
                    >
                      {inWishList ? (
                        <IoMdHeart fontSize={25} />
                      ) : (
                        <IoMdHeartEmpty fontSize={25} />
                      )}
                    </div>
                  )}
                </span>
                {/* TODO: add quickview */}
                <div className="flex bg-white shadow-lg p-1.5 rounded-lg self-end">
                  <IoGitCompareOutline fontSize={25} />
                </div>
              </div>
            </div>
          </div>
          <div className=" absolute bottom-0  flex-center w-full bg-black px-4 py-2.5 max-md:mt-10 max-md:px-5">
            <span
              className="flex items-center gap-5"
              onClick={async () => {
                await mutation.mutateAsync({
                  productId: item.id,
                  cart: !!item.cartId ? "remove" : "add",
                })
                setinCart(!inCart)
              }}
            >
              <IoCartOutline color="white" size="26" />
              <div className="my-auto text-base leading-5 text-white">
                {inCart ? "Remove from cart" : "Add to cart"}
              </div>
            </span>
          </div>
        </div>
        <div className="mt-6 text-base leading-5 text-zinc-800">
          {item.title}
        </div>
        <span className="mt-4 flex items-stretch gap-3 self-start">
          <div className="text-base text-zinc-800 text-opacity-80 line-through">
            $70.00
          </div>
          <div className="text-base text-zinc-800">${item.price}</div>
        </span>
        {/* <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/540f62635d1b5749940b5d69388ce7bbd06d7027f48a8c81a5e7a5995b4e69ca?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
              className="mt-5 aspect-[4.05] w-[77px] max-w-full self-start overflow-hidden object-contain object-center"
            /> */}
      </span>
    </div>
  )
}

function ProductGrid() {
  const { productsQueryDTO, columnSize } = useGlobalStore()
  const [data, setdata] = useState<IProduct[]>([])
  const [buttonPressed, setbuttonPressed] = useState(false)

  const query = api.product.infiniteProducts.useInfiniteQuery(
    { ...productsQueryDTO, wishlist: true },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
    }
  )
  // const countsQuery = api.product.productPropCounts.useQuery()

  function onWishRemove(id: string) {
    const idx = data.findIndex((item) => item.id === id)

    if (idx === -1) return

    const newData = [...data]

    newData.splice(idx, 1)

    setdata(newData)
  }

  useEffect(() => {
    console.log("running")
    const d = (query.data?.pages.map((page) => page.products).flat() ??
      []) as IProduct[]

    setdata(d)
  }, [query.data])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await query.refetch()
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    void fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(productsQueryDTO)])

  // useEffect(() => {
  //   console.log(countsQuery.data)
  //   globalStore.setProductCounts({ ...countsQuery.data })
  // }, [])

  if (query.error) {
    return <div>{query.error.message}</div>
  }

  if (query.isLoading) {
    return <div>Loading...</div>
  }
  if (!data.length) {
    return <div>No data</div>
  }

  return (
    <div className="w-full flex flex-col gap-10">
      {/* TODO: fix col size issue */}
      <div
        className={`grid gap-8`}
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
        }}
      >
        {data.map((item, i) => (
          <ProductItem key={item.id} item={item} onWishRemove={onWishRemove} />
        ))}
      </div>
      {query.hasNextPage && (
        <Button
          className="self-start"
          onClick={async () => {
            await query.fetchNextPage()
          }}
        >
          Loadmore
        </Button>
      )}
      {/* TODO: add pagination */}
    </div>
  )
}

export function PageView() {
  return (
    <span className="mx-auto w-full">
      <Breadcrumb />
      <PageTitle />
      <div className="mt-20">
        <div className="flex max-w-[1500px] w-full mx-auto  justify-between gap-10">
          <ProductGrid />
        </div>
      </div>
    </span>
  )
}
