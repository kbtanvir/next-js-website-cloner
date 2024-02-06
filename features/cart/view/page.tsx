"use client"

import { cartService } from "../controller/service"
import {
  useCartStore,
  type ICartItem,
  type ICartStore,
} from "../controller/store"
import { PageTitle } from "@/components/header/PageTitle"
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
    <div className="mx-auto w-full flex gap-10">
      {cart.length === 0 ? (
        <div className="w-full gap-5 border-[20px] border-gray-100  border-rounded-lg text-lg font-light text-center ap-y-12 bg-gray-200 p-5 flex-center">
          <IoBagOutline size="30" /> Your cart is empty
        </div>
      ) : (
        <div
          className={`grid gap-8 w-full grid-cols-3 gap-y-12 bg-gray-50 p-5`}
        >
          <span>Product</span>
          <span className="justify-self-end">Quantity</span>
          <span className="justify-self-end">Total</span>
          <>
            {cart.map((item) => <CartItem key={item.id} item={item} />) || (
              <span>No data</span>
            )}
          </>
        </div>
      )}

      <div
        className="max-w-[300px] w-full self-start bg-gray-100 
      grid  p-5 rounded-lg gap-5"
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
        </div>
      </div>
      {/* qty input  */}
      <div className="flex gap-5 justify-self-end items-start">
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
      <div className="justify-self-end">
        <span>${itemTotal}</span>
      </div>
    </>
  )
}

export function PageView() {
  return (
    <div className="mx-auto w-full">
      <PageTitle />
      <div className="mt-20">
        <div className="flex max-w-[1500px] w-full mx-auto  justify-between gap-10">
          <ProductGrid />
        </div>
      </div>
    </div>
  )
}
