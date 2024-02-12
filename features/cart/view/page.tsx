import { cartService } from "../controller/service"
import {
  useCartStore,
  type ICartItem,
  type ICartStore,
} from "../controller/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { debounce } from "lodash"
import { Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IoBagOutline } from "react-icons/io5"

function ProductGrid() {
  const cstate = useCartStore()

  const [{ total, cart }, setcState] = useState<ICartStore>({
    total: 0,
    cart: [] as ICartItem[],
  })

  useEffect(() => {
    setcState(cstate)
  }, [cstate])

  return (
    <div className="mx-auto w-full   gap-10 px-10 grid grid-cols-10 ">
      {cart.length === 0 ? (
        <div className="   col-span-7 max-lg:col-span-10  w-full gap-5 border-[20px] border-gray-100  border-rounded-lg text-lg font-light text-center   bg-gray-200 p-5 flex-center">
          <IoBagOutline size="30" /> Your cart is empty
        </div>
      ) : (
        <div
          className={`grid col-span-7 max-lg:col-span-10 gap-8 w-full grid-cols-5 gap-y-12 bg-gray-50 p-5 max-md:grid-cols-2`}
        >
          <span className="col-span-3 max-md:hidden">Product</span>
          <span className="justify-self-end col-span-1 max-md:hidden">
            Quantity
          </span>
          <span className="justify-self-end col-span-1 max-md:hidden">
            Total
          </span>
          <>
            {cart.map((item) => <CartItem key={item.id} item={item} />) || (
              <span>No data</span>
            )}
          </>
        </div>
      )}

      <div
        className="col-span-3 w-full self-start bg-gray-100 
      grid  p-5 rounded-lg gap-5 max-lg:col-span-10"
      >
        <div className="grid grid-cols-2 w-full bg-gray-200 p-5 rounded-lg">
          <span className="text-lg font-semibold">Subtotal</span>
          <span className="text-lg font-semibold justify-self-end">
            ${total}
          </span>
        </div>
        {cart.length > 0 && (
          <Link className="self-end" href="/checkout">
            <Button className="bg-black text-base px-10 py-5 h-12 text-white">
              Checkout
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export function CartItem({ item }: { item: ICartItem }) {
  // calculate item total with useEffect
  const [itemTotal, setitemTotal] = useState(item.qty * item.product.price)

  useEffect(() => {
    setitemTotal(item.qty * item.product.price)
  }, [item.product.price, item.qty])

  function handleQtyChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    if (value === "") return
    cartService.updateQty(
      {
        id: item.product.id,
      },
      Number(value)
    )
  }
  return (
    <>
      {/* product details */}
      <div className="flex gap-10 col-span-3">
        <Image
          loading="lazy"
          src={item.product.image}
          alt={item.product.title}
          width={80}
          height={80}
        />
        <div className="grid gap-4 w-full pr-10">
          <div className="font-light text-base">{item.product.title}</div>
          <div>
            <span className="text-gray-500">Price: </span>
            <span>${item.product.price}</span>
          </div>
        </div>
      </div>
      {/* qty input  */}
      <div className="flex gap-5 justify-self-end items-start col-span-1 max-md:justify-self-start">
        <Button
          className="flex place-content-center bg-white shadow-lg p-1.5 rounded-lg  h-9 aspect-square"
          onClick={() => cartService.removeFromCart({ id: item.id })}
        >
          <Trash fontSize={25} color="black" />
        </Button>
        <Input
          type="number"
          defaultValue={item.qty}
          onChange={debounce(handleQtyChange, 500)}
          className="w-20 caret-transparent"
          onKeyDown={(e) => e.preventDefault()}
          min={0}
        />
      </div>
      {/* price * qty */}
      <div className="justify-self-end col-span-1">
        <span>${itemTotal}</span>
      </div>
    </>
  )
}

export function PageView() {
  return (
    <div className="flex mt-20 justify-between gap-10 section-box-w">
      <ProductGrid />
    </div>
  )
}
