import { Breadcrumb } from "../../../components/header"
import { OrderByOptions, type IOrderBy, type IProduct } from "../model"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sidebar } from "@/features/shop/view/sidebar"
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
  refetch,
}: {
  item: IProduct
  refetch: () => void
}) {
  const wishMutation = api.product.updateWishList.useMutation()
  const cartMutation = api.product.updateCart.useMutation({
    onSuccess: () => {
      refetch()
    },
  })
  const [inWishList, setinWishList] = useState(!!item.wishlistId)
  const [inCart, setinCart] = useState(item.cartItem.length ? true : false)

  const [loading, setloading] = useState(false)

  return (
    <div className="flex-col   w-full max-md:ml-0 max-md:w-full">
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
                <div
                  className="flex place-content-center bg-white shadow-lg p-1.5 rounded-lg self-end h-9 aspect-square"
                  onClick={async () => {
                    await wishMutation.mutateAsync({
                      productId: item.id,
                      action: !!item.wishlistId ? "remove" : "add",
                    })
                    setinWishList(!inWishList)
                  }}
                >
                  {wishMutation.isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900" />
                  ) : inWishList ? (
                    <IoMdHeart fontSize={25} />
                  ) : (
                    <IoMdHeartEmpty fontSize={25} />
                  )}
                </div>

                <div className="flex bg-white shadow-lg p-1.5 rounded-lg self-end">
                  <IoGitCompareOutline fontSize={25} />
                </div>
              </div>
            </div>
          </div>
          <Button
            disabled={cartMutation.isLoading}
            className=" absolute bottom-0 focus:ring-offset-0 flex-center w-full bg-black px-4 py-2.5 max-md:mt-10 max-md:px-5"
            onClick={async () => {
              await cartMutation.mutateAsync({
                productId: item.id,
                action: item.cartItem.length ? "remove" : "add",
              })
              setinCart(!inCart)
            }}
          >
            <span className="flex items-center gap-5">
              <IoCartOutline color="white" size="26" />
              <div className="my-auto text-base leading-5 text-white">
                {inCart ? "Remove from cart" : "Add to cart"}
              </div>
            </span>
          </Button>
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
  const [data, setData] = useState<IProduct[]>([])

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
    const data = (infiniteQuery.data?.pages
      .map((page) => page.products)
      .flat() ?? []) as IProduct[]
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
          gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
        }}
      >
        {data.map((item, i) => (
          <ProductItem
            key={item.id}
            item={item}
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
function RelatedProductSection() {
  return (
    <div className=" mx-auto max-w-[1500px] mt-20 px-px max-md:mr-2.5 max-md:mt-10 max-md:max-w-full">
      <div className="mb-20 font-semibold mt-40 self-center whitespace-nowrap text-center text-4xl leading-10 text-zinc-800  ">
        You may also like
      </div>
      <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
        {/* {[...Array<number>(4)].map((_, i) => (
              <ProductItem key={i} />
            ))} */}
      </div>
    </div>
  )
}
