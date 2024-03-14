import { Popover, PopoverContent } from "@/components/ui/popover";
import { api } from "@/utils/api";
import { type Product } from "@prisma/client";
import { PopoverTrigger } from "@radix-ui/react-popover";

import { Button } from "@/components/ui/button";
import { cartService } from "@/features/cart/controller/service";
import { debounce } from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { Input } from "../../../components/ui/input";

function ListItem({ item }: { item: Product }) {
  return (
    <div
      key={item.id}
      className="flex justify-between border-b-2 px-5 py-2 last:border-b-0 hover:cursor-pointer hover:bg-gray-200"
    >
      {/* <Link href={`/products/${product.id}`}> */}
      <a className="flex items-center gap-5">
        <div className="h-[50px] w-[50px]">
          <Image
            loading="lazy"
            src={item.image}
            className="h-full w-full object-contain object-center"
            width={50}
            height={50}
            alt="product image"
            loader={({ src }) => {
              return src;
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm">{item.title}</span>
          <span className="text-sm">${item.price}</span>
        </div>
      </a>
      <Button
        className="bottom-[10px] left-[10px] h-10 w-10  min-w-0 rounded-md bg-emerald-600"
        onClick={() => {
          cartService.addToCart({
            id: item.id,
            product: item,
          });
        }}
        disabled={!item.inStock}
      >
        <span className="flex items-center gap-5">
          <BsCartPlus color="white" size="26" />
        </span>
      </Button>
      {/* </Link> */}
    </div>
  );
}

function List({
  products,
  isLoading,
}: {
  products: Product[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return <div className="p-5 text-center">Loading...</div>;
  }

  if (products.length === 0) {
    return <div className="p-5 text-center">No products found</div>;
  }

  return (
    <div className="">
      {products.map((product) => (
        <ListItem key={product.id} item={product} />
      ))}
    </div>
  );
}

export function SearchProducts() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setisOpen] = useState<boolean>(false);

  const muation = api.product.searchProducts.useMutation();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch("");
    if (isOpen || e.target.value === "") {
      return;
    }

    setSearch(e.target.value);

    console.log(search);
  };

  useEffect(() => {
    if (muation.isSuccess) {
      setProducts(muation.data);
    }
  }, [muation.data, muation.isSuccess]);

  useEffect(() => {
    if(search === "") return;
    setProducts([]);
    setisOpen(true);
    muation.mutate(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Popover open={isOpen}>
      <PopoverTrigger className="relative flex w-full max-w-[750px]  justify-between gap-0 p-0 max-md:order-3   max-md:max-w-full max-md:flex-wrap">
        <Input
          onChange={debounce(handleChange, 700)}
          className="h-[50px] w-full border border-solid border-zinc-800 border-opacity-10 bg-white pl-8   pr-20 focus:ring-opacity-0"
          placeholder="Search for products"
        />
        <span className="flex-center absolute right-3 top-1 aspect-square w-[44px] rounded-lg">
          <IoSearch className="text-[30px] text-gray-400 max-md:text-[20px]" />
        </span>
      </PopoverTrigger>

      <PopoverContent
        // avoidCollisions={true}
        // side={"left"}
        onPointerDownOutside={() => setisOpen(false)}
        className="z-10 w-[500px] bg-gray-50 p-0 shadow-md"
        arrowPadding={0}
        collisionPadding={0}
        sideOffset={0}
      >
        <List products={products} isLoading={muation.isLoading} />
      </PopoverContent>
    </Popover>
  );
}
