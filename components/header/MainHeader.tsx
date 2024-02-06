"use client"

import { SearchProducts } from "./SearchProducts"
import UserButton from "@/components/user-button"
import { useCartStore } from "@/features/cart/controller/store"
import { CartIcon, WishIcon } from "@/lib/icons"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function MainHeader() {
  const { total } = useCartStore()

  const [cTotal, setcTotal] = useState(0)

  useEffect(() => setcTotal(total), [total])

  return (
    <div
      className={`mx-auto py-9 flex max-w-[1500px] items-center justify-between gap-15 max-xl:px-8 max-md:flex-wrap`}
    >
      <Link href="/">
        <h1 className="text-[30px] font-bold uppercase">E-shoper</h1>
      </Link>
      <SearchProducts />
      <div className="flex w-full max-w-[116px] justify-end gap-5 items-center">
        <div className="relative">
          <UserButton />
        </div>
        <Link href="/wishlist" className="relative">
          <div className="relative">
            <WishIcon />
            <div className="absolute right-[-5px] top-[-8px] flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 align-middle text-[10px] text-white">
              0
            </div>
          </div>
        </Link>
        <Link href={"/cart"} className="relative">
          <CartIcon />
          <div className="absolute right-[-10px] top-[-8px] flex h-4  px-1 items-center justify-center rounded-full bg-blue-600 align-middle text-[10px] text-white">
            {cTotal}
          </div>
        </Link>
      </div>
    </div>
  )
}
