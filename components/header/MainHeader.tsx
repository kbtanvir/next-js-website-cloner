import { SearchProducts } from "./SearchProducts"
import { useCartStore } from "@/features/cart/controller/store"
import { CartIcon } from "@/lib/icons"
import Link from "next/link"
import { useEffect, useState } from "react"
import { api } from "~/utils/api"
import { globalStore, useGlobalStore } from "~/utils/global.store"

function WishCount() {
  const { wishlistTotal } = useGlobalStore()

  const query = api.product.getWishListCount.useQuery()

  useEffect(() => {
    if (query.data) {
      globalStore.setWishlistTotal(query.data)
    }
  }, [query.data])

  return (
    <div className="absolute right-[-5px] top-[-8px] flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 align-middle text-[10px] text-white">
      {wishlistTotal}
    </div>
  )
}

export default function MainHeader() {
  const { total } = useCartStore()

  const [cTotal, setcTotal] = useState(0)

  useEffect(() => setcTotal(total), [total])

  return (
    <div
      className={`mx-auto py-9 max-md:py-4 flex max-w-[1500px] items-center justify-between gap-15 section-px  max-md:flex-wrap max-lg:justify-between gap-5 w-full `}
    >
      <Link href="/" className="text-nowrap max-md:order-1 max-md:self-start">
        <h1 className="text-[30px] font-bold uppercase max-md:text-2xl">
          E-shopper
        </h1>
      </Link>
      <SearchProducts />
      <div className="max-md:order-2 max-md:self-end flex w-full max-w-[116px] justify-end gap-5 items-center">
        {/* <div className="relative">
          <UserButton />
        </div> */}
        {/* <Link href="/wishlist" className="relative">
          <div className="relative">
            <WishIcon />
            <WishCount />
          </div>
        </Link> */}
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
