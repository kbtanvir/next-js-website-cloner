import { type IProduct } from "../model"
import Image from "next/image"
import { useState } from "react"
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io"
import { IoCartOutline, IoGitCompareOutline } from "react-icons/io5"
import { api } from "~/utils/api"

export function ProductItem({ item }: { item: IProduct }) {
  const mutation = api.product.updateWishlist.useMutation()
  const cartMutation = api.cart.update.useMutation()
  const [inWishList, setinWishList] = useState(!!item.wishlistId)
  const [inCart, setinCart] = useState(!!item.cartId)

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
                <span>
                  {mutation.isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
                  ) : (
                    <div
                      className="flex bg-white shadow-lg p-1.5 rounded-lg self-end"
                      onClick={async () => {
                        await mutation.mutateAsync({
                          productId: item.id,
                          wishlist: !!item.wishlistId ? "remove" : "add",
                        })
                        setinWishList(!inWishList)
                      }}
                    >
                      {inWishList ? (
                        <IoMdHeart fontSize={25} />
                      ) : (
                        <IoMdHeartEmpty fontSize={25} />
                      )}
                    </div>
                  )}
                </span>
                {/* TODO: add quickview */}
                <div className="flex bg-white shadow-lg p-1.5 rounded-lg self-end">
                  <IoGitCompareOutline fontSize={25} />
                </div>
              </div>
            </div>
          </div>
          <div className=" absolute bottom-0  flex-center w-full bg-black px-4 py-2.5 max-md:mt-10 max-md:px-5">
            <span
              className="flex items-center gap-5"
              onClick={async () => {
                await mutation.mutateAsync({
                  productId: item.id,
                  cart: !!item.cartId ? "remove" : "add",
                })
                setinCart(!inCart)
              }}
            >
              <IoCartOutline color="white" size="26" />
              <div className="my-auto text-base leading-5 text-white">
                {inCart ? "Remove from cart" : "Add to cart"}
              </div>
            </span>
          </div>
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
