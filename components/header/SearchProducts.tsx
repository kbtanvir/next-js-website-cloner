"use client"

import { Input } from "../ui/input"
import { Popover, PopoverContent } from "@/components/ui/popover"
import { type Product } from "@prisma/client"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { debounce } from "lodash"
import Image from "next/image"
import { useEffect, useState } from "react"
import { IoSearch } from "react-icons/io5"
import { api } from "~/utils/api"

function ListItem({ product }: { product: Product }) {
  return (
    <div key={product.id} className="border py-2 px-5">
      {/* <Link href={`/products/${product.id}`}> */}
      <a className="flex gap-5 items-center">
        <div className="w-[50px] h-[50px]">
          <Image
            loading="lazy"
            src={product.image}
            className="w-full h-full object-contain object-center"
            width={50}
            height={50}
            alt="product image"
            loader={({ src }) => {
              return src
            }}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm">{product.title}</span>
          <span className="text-sm">${product.price}</span>
        </div>
      </a>
      {/* </Link> */}
    </div>
  )
}

function List({
  products,
  isLoading,
}: {
  products: Product[]
  isLoading: boolean
}) {
  if (isLoading) {
    return <div className="text-center p-5">Loading...</div>
  }

  if (products.length === 0) {
    return <div className="text-center p-5">No products found</div>
  }

  return (
    <div className="">
      {products.map((product) => (
        <ListItem key={product.id} product={product} />
      ))}
    </div>
  )
}

export function SearchProducts() {
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [isOpen, setisOpen] = useState<boolean>(false)

  const muation = api.product.searchProducts.useMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isOpen || e.target.value === "") {
      return
    }
    setProducts([])
    setisOpen(true)
    setSearch(e.target.value)
    muation.mutate(search)
  }

  useEffect(() => {
    if (muation.isSuccess) {
      setProducts(muation.data)
    }
  }, [muation.data, muation.isSuccess])

  return (
    <Popover open={isOpen}>
      <PopoverTrigger className="flex w-full relative max-md:order-3  max-w-[750px]  justify-between gap-0   max-md:max-w-full max-md:flex-wrap">
        <Input
          onChange={debounce(handleChange, 500)}
          className="h-[50px] w-full border border-solid border-zinc-800 border-opacity-10 pl-20   focus:ring-opacity-0 bg-gray-100"
          placeholder="Search for products"
        />
        <span className="absolute flex-center left-3 top-1 w-[44px] aspect-square rounded-lg">
          <IoSearch className="text-[30px] max-md:text-[20px] text-gray-600" />
        </span>
      </PopoverTrigger>

      <PopoverContent
        // avoidCollisions={true}
        // side={"left"}
        onPointerDownOutside={() => setisOpen(false)}
        className="w-[500px] bg-gray-50 z-10 shadow-md"
      >
        <List products={products} isLoading={muation.isLoading} />
      </PopoverContent>
    </Popover>
  )
}
