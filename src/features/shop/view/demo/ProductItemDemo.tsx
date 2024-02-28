"use client";
import { Button } from "@/components/ui/button";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";

export function ProductItemDemo({
  imageCategory = "fashion",
}: {
  imageCategory: string;
}) {
  const [item] = useState({
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.urlLoremFlickr({
      category: imageCategory,
    }),
    sizes: [
      { name: "S" },
      { name: "M" },
      { name: "L" },
      { name: "XL" },
      { name: "XXL" },
    ],
    inStock: faker.datatype.boolean(),
  });
  return (
    <div
      suppressHydrationWarning
      className="relative w-full cursor-pointer flex-col overflow-hidden rounded-md border border-solid border-gray-100 p-3 shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-lg max-md:ml-0 max-md:w-full"
    >
      <div className="relative w-full flex-col overflow-hidden max-md:ml-0 max-md:w-full">
        <span className="flex flex-col items-stretch ">
          <div className="flex-co relative  flex aspect-[2/2.5] w-full overflow-hidden rounded-lg">
            <Image
              suppressHydrationWarning
              loading="lazy"
              src={item.image}
              alt={""}
              className="absolute h-full w-full object-cover object-center"
              width={279}
              height={330}
            />

            <div className="flex w-full flex-col items-stretch border  pb-px pt-2.5">
              <div className="flex flex-col items-stretch px-3">
                <span className="absolute mt-1 grid items-stretch  justify-center gap-3 ">
                  <span className="justify-self-start whitespace-nowrap rounded-md border border-solid border-white border-opacity-10 bg-neutral-900 px-3.5 py-1.5 text-center text-xs leading-3 text-white">
                    {faker.number.float({ min: 10, max: 50 })}% off
                  </span>

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
                </span>
              </div>
            </div>
            {item.inStock && (
              <Button
                className="absolute bottom-[10px] left-[10px] h-10 w-10  min-w-0 rounded-md bg-emerald-600"
                disabled={!item.inStock}
              >
                <span className="flex items-center gap-5">
                  <IoCartOutline color="white" size="26" />
                </span>
              </Button>
            )}
          </div>
          <div className="mt-6 self-start rounded-md border-2 px-2 py-1 text-sm text-gray-600">
            Category
          </div>
          <div className="text-md mt-4  leading-7 text-zinc-800">
            {item.title}
          </div>
          <span className="mt-3 flex items-center gap-3 self-start pb-3">
            <div className="text-sm text-gray-400 line-through ">
              ${item.price}
            </div>
            <div className="text-lg font-bold text-emerald-500">
              $
              {Number(item.price) -
                (Number(item.price) *
                  faker.number.float({ min: 10, max: 50 })) /
                  100}
            </div>
          </span>
        </span>
      </div>
    </div>
  );
}
