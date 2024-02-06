"use client";

import { Input } from "../ui/input";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { type Product } from "@prisma/client";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";


function ListItem({ product }: { product: Product }) {
  return (
    <div key={product.id} className="border py-2 px-5">
      {/* <Link href={`/products/${product.id}`}> */}
      <a className="flex gap-5 items-center">
        <div className="w-[50px] h-[50px]">
          <img
            loading="lazy"
            src={product.image}
            className="w-full h-full object-contain object-center"
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

export function SearchProducts() {
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [isOpen, setisOpen] = useState<boolean>(false)

  const muation = api.product.searchProducts.useMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isOpen) setisOpen(true)
    setProducts([])
    setSearch(e.target.value)
    muation.mutate(search)
  }

  useEffect(() => {
    if (muation.isSuccess) {
      setProducts(muation.data)
    }
  }, [muation.data, muation.isSuccess])

  return (
    <>
      <Popover open={isOpen}>
        <PopoverTrigger className="flex w-full relative  max-w-[750px] items-stretch justify-between gap-0 self-stretch max-md:max-w-full max-md:flex-wrap">
          <Input
            onChange={debounce(handleChange, 500)}
            className="h-[50px] w-full border border-solid border-zinc-800 border-opacity-10 pl-20"
            placeholder="Search for products"
          />
          <span className="absolute">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2eedb4369e4c6c5540db074793bc03e0566864459364db450b723fea7a4985fa?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
              className="aspect-[1.1] w-[55px] max-w-full overflow-hidden object-contain object-center"
            />
          </span>
        </PopoverTrigger>

        <PopoverContent
          // avoidCollisions={true}
          // side={"left"}
          onPointerDownOutside={() => setisOpen(false)}
          className="w-[500px] bg-gray-50 z-10 shadow-md"
        >
          <div className="">
            {products.length === 0 ? (
              <>
                <div className="text-center p-5">No products found</div>
              </>
            ) : (
              products.map((product) => (
                <ListItem key={product.id} product={product} />
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}