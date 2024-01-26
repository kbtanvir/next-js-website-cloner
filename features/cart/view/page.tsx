import { Breadcrumb } from "../../../components/header"
import { PageTitle } from "@/components/PageTitle"
import { type Cart, type Products, type Size } from "@prisma/client"
import Image from "next/image"
import { useState } from "react"
import { api } from "~/utils/api"

function ProductGrid() {
  const [data, setData] = useState([])

  const query = api.cart.getIninite.useQuery()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await query.refetch()
  //     } catch (error) {
  //       console.error("Error fetching data:", error)
  //     }
  //   }

  //   void fetchData()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [JSON.stringify(productsQueryDTO)])

  // useEffect(() => {
  //   const data = query.data?.pages.map((page) => page.products).flat() ?? []
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //   setData(data)
  //   console.log(data)

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [query.data])

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
    <div className="w-full flex flex-col gap-10">
      <div
        className={`grid gap-8 w-full grid-cols-3`}
        // style={{
        //   gridTemplateColumns: `repeat(auto-fit, minmax(3fr, 3fr))`,
        // }}
      >
        <div>Product</div>
        <div>Quantity</div>
        <div>Total</div>

        {query.data.map((item) => (
          <CartItem key={item.productId} item={item} refetch={query.refetch} />
        ))}
      </div>
    </div>
  )
}

export function CartItem({
  item,
  refetch,
}: {
  item: Cart & { product: Products & { sizes: Size[] } }
  refetch: () => void
}) {
  const updateCart = api.cart.updateCart.useMutation()
  return (
    <>
      {/* product details */}
      <div className="flex gap-5">
        <Image
          loading="lazy"
          src={item.product.image}
          alt={item.product.title}
          width={80}
          height={80}
        />
        <div className="">
          <div className="text-xl font-bold pb-5">{item.product.title}</div>
          <div>
            {item.product.sizes.map((size) => (
              <span key={size.id}>{size.name} ,</span>
            ))}
          </div>
        </div>
      </div>
      {/* qty input  */}
      <div>
        <input
          type="number"
          value={item.qty}
          onChange={async (e) => {
            await updateCart.mutateAsync({
              productId: item.productId,
              quantity: parseInt(e.target.value),
            })
            refetch()
          }}
        />
      </div>
      {/* price * qty */}
      <div>
        <span>{item.product.price * item.qty}</span>
      </div>
    </>
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
