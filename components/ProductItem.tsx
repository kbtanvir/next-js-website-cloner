import { Button } from "@/components/ui/button"
import { cartService } from "@/features/cart/controller/service"
import { type IProduct } from "@/features/shop/model"
import Image from "next/image"
import { useState } from "react"
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io"
import { IoCartOutline, IoGitCompareOutline } from "react-icons/io5"
import { api } from "~/utils/api"

export function ProductItem({
  item,
  refetch,
}: {
  item: IProduct
  refetch: () => void
}) {
  const wishMutation = api.product.updateWish.useMutation({
    onSuccess: refetch,
  })
  const cartMutation = api.product.updateCart.useMutation({
    onSuccess: refetch,
  })
  const [wished, setwished] = useState(item.wishlist.length ? true : false)

  return (
    <div className="flex-col   w-full max-md:ml-0 max-md:w-full">
      <span className="flex flex-col items-stretch max-md:mt-9 ">
        <div className="relative flex  aspect-[2/2.5] w-full flex-col border-[1px] border-solid border-black ">
          <Image
            loading="lazy"
            src={item.image}
            alt={item.title}
            className="absolute object-cover object-center h-full w-full"
            width={279}
            height={330}
          />

          <div className="flex flex-col w-full items-stretch border  pb-px pt-2.5">
            <div className="flex flex-col items-stretch px-3">
              <span className="absolute mt-1 grid gap-3  items-stretch justify-center ">
                <span className="whitespace-nowrap justify-self-start rounded-md border border-solid border-white border-opacity-10 bg-neutral-900 px-3.5 py-1.5 text-center text-xs leading-3 text-white">
                  -21%
                </span>

                <span className="whitespace-nowrap justify-self-start  flex gap-4 flex-wrap max-w-[200px]">
                  {item.sizes.map((size, i: number) => (
                    <span
                      key={i}
                      className="whitespace-nowrap rounded-md border border-solid border-white border-opacity-10 bg-gray-200 px-1.5 py-1.5 text-center text-xs leading-3 shadow-md text-black font-bold"
                    >
                      {size.name}
                    </span>
                  ))}
                </span>
                {!item.inStock && (
                  <span className="justify-self-start whitespace-nowrap rounded-md border border-solid border-white border-opacity-10 bg-red-600 px-3.5 py-1.5 text-center text-xs leading-3 text-white">
                    {"Out of Stock"}
                  </span>
                )}
              </span>
              <div className="absolute flex flex-col items-center gap-2.5 self-end">
                <Button
                  className="flex place-content-center bg-white shadow-lg p-1.5 rounded-lg self-end h-9 aspect-square"
                  disabled={wishMutation.isLoading}
                  onClick={async () => {
                    await wishMutation.mutateAsync({
                      productId: item.id,
                      action: item.wishlist.length ? "remove" : "add",
                    })
                    setwished(!wished)
                  }}
                >
                  {wishMutation.isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 text-black border-gray-900" />
                  ) : wished === true ? (
                    <IoMdHeart fontSize={25} color="black" />
                  ) : (
                    <IoMdHeartEmpty fontSize={25} color="black" />
                  )}
                </Button>

                <div className="flex bg-white shadow-lg p-1.5 rounded-lg self-end">
                  <IoGitCompareOutline fontSize={25} />
                </div>
              </div>
            </div>
          </div>
          <Button
            disabled={cartMutation.isLoading}
            className=" absolute bottom-0 rounded-none focus:ring-offset-0 focus:ring-opacity-0 flex-center w-full bg-black px-4 py-2.5 max-md:mt-10 max-md:px-5"
            onClick={() => {
              cartService.addToCart({
                id: item.id,
                product: item,
              })
            }}
          >
            <span className="flex items-center gap-5">
              <IoCartOutline color="white" size="26" />
              <div className="my-auto text-base leading-5 text-white">
                {"Add to cart"}
              </div>
            </span>
          </Button>
        </div>
        <div className="mt-6 text-base leading-5 text-zinc-800">
          {item.title}
        </div>
        <span className="mt-4 flex items-stretch gap-3 self-start">
          <div className="text-base text-zinc-800 text-opacity-80 line-through">
            $70.00
          </div>
          <div className="text-base text-zinc-800">${item.price}</div>
        </span>
        {/* <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/540f62635d1b5749940b5d69388ce7bbd06d7027f48a8c81a5e7a5995b4e69ca?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
                  className="mt-5 aspect-[4.05] w-[77px] max-w-full self-start overflow-hidden object-contain object-center"
                /> */}
      </span>
    </div>
  )
}
