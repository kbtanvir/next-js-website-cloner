"use client"

import { Breadcrumb } from "../../../components/header"
import { cartService } from "../controller/service"
import { useCartStore, type ICartItem } from "../controller/store"
import { PageTitle } from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { debounce } from "lodash"
import { Trash } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

function ProductGrid() {
  const { total, cart } = useCartStore()

  return (
    <div className="w-full flex flex-col gap-10 max-w-[1100px]">
      <div className={`grid gap-8 w-full grid-cols-3 gap-y-12 `}>
        <div>Product</div>
        <div className="justify-self-end">Quantity</div>
        <div className="justify-self-end">Total</div>
        {cart.map((item) => <CartItem key={item.id} item={item} />) || (
          <div>No data</div>
        )}
      </div>
      <div
        className="max-w-[300px] w-full self-end bg-gray-50 
      flex justify-between items-center p-5 rounded-lg shadow-lg"
      >
        <div className="text-lg font-semibold">Total</div>
        <div className="text-lg font-semibold">${total}</div>
      </div>
      <Button className="bg-black text-xl px-10 py-5 text-white self-end">
        Checkout
      </Button>
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
        <Input
          type="number"
          defaultValue={item.qty}
          onChange={debounce(handleQtyChange, 500)}
          className="w-20 caret-transparent"
          onKeyDown={(e) => {
            e.preventDefault()
          }}
          
          min={0}
        />
        {/* delete icon */}
        <Button
          className="flex place-content-center bg-white shadow-lg p-1.5 rounded-lg  h-9 aspect-square"
          onClick={() => {
            cartService.removeFromCart({ id: item.id })
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
    <div className="mx-auto w-full">
      <Breadcrumb />
      <PageTitle />
      <div className="mt-20">
        <div className="flex max-w-[1500px] w-full mx-auto  justify-between gap-10">
          <ProductGrid />
        </div>
      </div>
    </div>
  )
}
