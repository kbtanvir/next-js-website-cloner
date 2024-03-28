import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoBagOutline } from "react-icons/io5";
import { cartService } from "../controller/service";
import {
  useCartStore,
  type ICartItem,
  type ICartStore,
} from "../controller/store";

function ProductGrid() {
  const cstate = useCartStore();

  const [{ total, cart }, setcState] = useState<ICartStore>({
    total: 0,
    cart: [] as ICartItem[],
  });

  useEffect(() => {
    setcState(cstate);
  }, [cstate]);

  return (
    <div className="mx-auto grid w-full grid-cols-10  place-items-start  gap-10 max-sm:flex max-sm:flex-col">
      {cart.length === 0 ? (
        <div className="border-rounded-lg flex-center  col-span-7 w-full gap-5 border-[20px]  border-gray-100 bg-gray-200 p-5 text-center   text-lg font-light max-lg:col-span-10">
          <IoBagOutline size="30" /> Your cart is empty
        </div>
      ) : (
        <>
          <div
            className={`col-span-7 grid gap-5 bg-gray-50   p-5 max-lg:col-span-10 max-sm:bg-transparent max-sm:p-0 `}
          >
            <div
              className={`col-span-7 grid w-full grid-cols-5 gap-8 gap-y-5 bg-gray-50 px-5 max-lg:col-span-10  max-md:grid-cols-2`}
            >
              <span className="col-span-3 font-bold max-md:hidden">
                Product
              </span>
              <span className="col-span-1 justify-self-end font-bold  max-md:hidden">
                Quantity
              </span>
              <span className="col-span-1 justify-self-end font-bold max-md:hidden">
                Total
              </span>
            </div>
            {cart.map((item) => <CartItem key={item.id} item={item} />) || (
              <span>No data</span>
            )}
          </div>
        </>
      )}

      <div
        className="col-span-3 grid w-full gap-5 
      self-start  rounded-lg bg-gray-100 p-5 max-lg:col-span-10"
      >
        <div className="grid w-full grid-cols-2 rounded-lg bg-gray-200 p-5">
          <span className="text-lg font-semibold">Subtotal</span>
          <span className="justify-self-end text-lg font-semibold">
            ${total}
          </span>
        </div>
        {cart.length > 0 && (
          <Link
            className="self-end"
            href={siteNavigation.ecommerce.checkout.path}
          >
            <Button className="h-12 bg-black px-10 py-5 text-base text-white">
              Checkout
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export function CartItem({ item }: { item: ICartItem }) {
  // calculate item total with useEffect
  const [itemTotal, setitemTotal] = useState(item.qty * item.product.price);

  useEffect(() => {
    setitemTotal(item.qty * item.product.price);
  }, [item.product.price, item.qty]);

  function handleQtyChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value === "") return;
    cartService.updateQty(
      {
        id: item.product.id,
      },
      Number(value),
    );
  }
  return (
    <>
      <div
        className={`col-span-7 grid w-full grid-cols-5 items-center gap-8 gap-y-5 rounded-xl bg-gray-100 p-5 shadow-md max-lg:col-span-10 max-md:grid-cols-2  `}
      >
        {/* product details */}
        <div className="col-span-3 flex gap-10">
          <Image
            loading="lazy"
            src={item.product.image}
            alt={item.product.title}
            width={80}
            height={80}
          />
          <div className="grid w-full gap-4 pr-10">
            <div className="text-base font-light">{item.product.title}</div>
            <div>
              <span className="text-gray-500">Price: </span>
              <span>${item.product.price}</span>
            </div>
          </div>
        </div>
        {/* qty input  */}
        <div className="col-span-1 flex items-start gap-5 justify-self-end max-md:justify-self-start max-sm:col-span-2">
          <Button
            className="flex aspect-square h-9 cursor-pointer place-content-center rounded-lg bg-white  p-1.5 shadow-lg hover:bg-black max-sm:p-0 [&>.icon]:text-black [&>.icon]:hover:text-white"
            onClick={() => cartService.removeFromCart({ id: item.id })}
          >
            <Trash className="icon transition-all" />
          </Button>
          <Input
            type="number"
            defaultValue={item.qty}
            onChange={debounce(handleQtyChange, 500)}
            // className="w-20 caret-transparent"
            // onKeyDown={(e) => e.preventDefault()}
            min={0}
          />
        </div>
        {/* price * qty */}
        <div className="col-span-1 justify-self-end">
          <span>${itemTotal}</span>
        </div>
      </div>
    </>
  );
}

export function PageView() {
  return (
    <div className="section-box-w flex justify-between gap-10 py-20 max-md:py-10">
      <ProductGrid />
    </div>
  );
}
