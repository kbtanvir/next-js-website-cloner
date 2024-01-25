import { Button } from "@/components/ui/button"
import { useInfiniteProductQuery } from "@/hooks/query"
import { type Product } from "@prisma/client"
import Image from "next/image"
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
  // const [d, setdata] = useState<Partial<Product>>([])

  // useEffect(() => {
  //   const second = fakeProducts

  //   setdata(second)
  // }, [])

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
        {data.map((item) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

function ProductItem({ item }: { item: Partial<Product> }) {
  return (
    <div className="grid gap-4 place-items-center ">
      <div className={"h-64 w-full relative"}>
        <Image
          src={item.image as string}
          alt={item.title as string}
          layout="fill"
          className={"image"}
          objectFit="cover"
        />
      </div>
      {/* <Image
        src={item.image as string}
        alt={item.title as string}
        width="500"
        height="300"
      /> */}
      <h2>{item.title}</h2>
      <p className="text-teal-200 text-[20px] ">${item.price}</p>
      <Button
        className="w-full sm:w-60 "
        onClick={
          () => console.log("")
          // cartStore.setState((data: ICartStore) => {
          //   console.log(data.cartItems)
          //   const newData = data.cartItems.concat(item)
          //   const total = newData.reduce((acc, item) => {
          //     return acc + Number(item.price)
          //   }, 0)
          //   console.log(total)
          //   return {
          //     ...data,
          //     cartItems: newData,
          //     total,
          //   }
          // })
        }
      >
        Add to cart
      </Button>
    </div>
  )
}
