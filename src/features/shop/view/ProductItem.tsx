import { Button } from "@/components/ui/button";

import { cartService } from "@/features/cart/controller/service";
import { type IProduct } from "@/features/shop/model";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";

export function ProductItem({
  item,
  refetch,
}: {
  item: IProduct;
  refetch: () => void;
}) {
  const [discountPercentage, setdiscountPercentage] = useState<string>("");
  const [discountPrice, setdiscountPrice] = useState<number>(0);

  useEffect(() => {
    if (!item.discount) {
      return;
    }
    const discount = item.discount.amount;
    const price = item.price;
    const discountPrice = price - price * discount;
    const percent = Math.floor(discount * 100);
    setdiscountPrice(discountPrice);
    setdiscountPercentage(`-${percent}%`);
  }, [item.discount, item.price]);

  return (
    <div className="relative w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-solid border-gray-200 p-3 shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-md max-md:ml-0 max-md:w-full">
      <div className="relative w-full flex-col overflow-hidden max-md:ml-0 max-md:w-full">
        <span className="flex flex-col items-stretch ">
          <div className="relative flex aspect-[2/2.5] w-full flex-col overflow-hidden rounded-lg">
            <Image
              loading="lazy"
              src={item.image}
              alt={item.title}
              className="object-cover object-center"
              fill
            />

            <div className="flex w-full flex-col items-stretch border  pb-px pt-2.5">
              <div className="flex flex-col items-stretch px-3">
                <span className="absolute mt-1 grid items-stretch  justify-center gap-3 ">
                  {item.discount && (
                    <span className="justify-self-start whitespace-nowrap rounded-md border border-solid border-white border-opacity-10 bg-neutral-900 px-3.5 py-1.5 text-center text-xs leading-3 text-white">
                      {discountPercentage}
                    </span>
                  )}
                  {!item.inStock && (
                    <span className="justify-self-start whitespace-nowrap rounded-md border border-solid border-white border-opacity-10 bg-red-600 px-3.5 py-1.5 text-center text-xs leading-3 text-white">
                      Out of stock
                    </span>
                  )}

                  <span className="flex max-w-[200px]  flex-wrap gap-4 justify-self-start whitespace-nowrap">
                    {item.sizes.map((size, i: number) => (
                      <span
                        key={i}
                        className="whitespace-nowrap rounded-md border border-solid border-white border-opacity-10 bg-gray-200 px-1.5 py-1.5 text-center text-xs font-bold leading-3 text-black shadow-md"
                      >
                        {size.name}
                      </span>
                    ))}
                  </span>
                  {/* {!item.inStock && (
                  <span className="justify-self-start whitespace-nowrap rounded-md border border-solid border-white border-opacity-10 bg-red-600 px-3.5 py-1.5 text-center text-xs leading-3 text-white">
                    {"Out of Stock"}
                  </span>
                )} */}
                </span>
                <div className="absolute flex flex-col items-center gap-2.5 self-end">
                  {/* <Button
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
                </Button> */}

                  {/* <div className="flex bg-white shadow-lg p-1.5 rounded-lg self-end">
                  <IoGitCompareOutline fontSize={25} />
                </div> */}
                </div>
              </div>
            </div>
            {item.inStock && (
              <Button
                className="absolute bottom-[10px] left-[10px] h-10 w-10  min-w-0 rounded-md bg-emerald-600"
                onClick={() => {
                  cartService.addToCart({
                    id: item.id,
                    product: item,
                  });
                }}
                disabled={!item.inStock}
              >
                <span className="flex items-center gap-5">
                  <IoCartOutline color="white" size="26" />
                </span>
              </Button>
            )}
          </div>
          <div className="mt-6 self-start rounded-md border-2 px-2 py-1 text-sm text-gray-600">
            {item.categories[0]?.name}
          </div>
          <div className="text-md mt-4  leading-7 text-zinc-800">
            {item.title}
          </div>
          <span className="mt-3 flex items-center gap-3 self-start pb-3">
            <div className="text-sm text-gray-400 line-through ">
              ${item.price}
            </div>
            <div className="text-lg font-bold text-emerald-500">
              ${discountPrice}
            </div>
          </span>
          {/* <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/540f62635d1b5749940b5d69388ce7bbd06d7027f48a8c81a5e7a5995b4e69ca?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
                  className="mt-5 aspect-[4.05] w-[77px] max-w-full self-start overflow-hidden object-contain object-center"
                /> */}
        </span>
      </div>
    </div>
  );
}
