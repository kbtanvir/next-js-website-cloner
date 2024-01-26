import { Breadcrumb } from "../../../components/header"
import { PageTitle } from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type Cart, type Products, type Size } from "@prisma/client"
import { debounce } from "lodash"
import { Trash } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { api } from "~/utils/api"

function ProductGrid() {
  const query = api.cart.getIninite.useQuery()

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
    <div className="w-full flex flex-col gap-10 max-w-[1100px]">
      <div
        className={`grid gap-8 w-full grid-cols-3 gap-y-12 `}
        // style={{
        //   gridTemplateColumns: `repeat(auto-fit, minmax(3fr, 3fr))`,
        // }}
      >
        <div>Product</div>
        <div className="justify-self-end">Quantity</div>
        <div className="justify-self-end">Total</div>

        {query.data.map((item) => (
          <CartItem key={item.productId} item={item} refetch={query.refetch} />
        ))}
      </div>
      <Button className="bg-black text-white self-end">Checkout</Button>
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

  const [itemTotal, setitemTotal] = useState(item.product.price * item.qty)

  // calculate item total with useEffect

  useEffect(() => {
    setitemTotal(item.product.price * item.qty)
  }, [item.product.price, item.qty])

  function handleQtyChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    if (value === "") return
    updateCart.mutate({
      productId: item.productId,
      qty: parseInt(value),
    })
    refetch()
  }
  return (
    <>
      {/* product details */}
      <div className="flex gap-10">
        <Image
          loading="lazy"
          src={item.product.image}
          alt={item.product.title}
          width={80}
          height={80}
        />
        <div className="grid gap-4">
          <div className="text-lg font-light ">{item.product.title}</div>
          <div>
            <span className="text-gray-500">Price: </span>
            <span>${item.product.price}</span>
          </div>
          <div className="flex gap-1">
            {item.product.sizes.map((size) => (
              <span
                className="  border flex flex-center  w-8 aspect-square"
                key={size.id}
              >
                {size.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* qty input  */}
      <div className="flex gap-5 justify-self-end items-start">
        <Input
          type="number"
          defaultValue={item.qty}
          onChange={debounce(handleQtyChange, 500)}
          className="w-20"
          min={0}
        />
        {/* delete icon */}
        <Button
          className="flex place-content-center bg-white shadow-lg p-1.5 rounded-lg  h-9 aspect-square"
          disabled={updateCart.isLoading}
          onClick={async () => {
            await updateCart.mutateAsync({
              productId: item.productId,
              action: "remove",
            })
            refetch()
          }}
        >
          <Trash fontSize={25} color="black" />
        </Button>
      </div>
      {/* price * qty */}
      <div className="justify-self-end">
        <span>${itemTotal}</span>
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
