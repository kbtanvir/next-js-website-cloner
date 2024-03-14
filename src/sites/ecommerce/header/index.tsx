import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/features/cart/controller/store";
import { Paths } from "@/lib/const/navigation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { BiDrink } from "react-icons/bi";
import { GiFruitBowl, GiSlicedBread } from "react-icons/gi";
import { IoCartOutline } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";
import { SearchProducts } from "./SearchProducts";

export const Categories = {
  "Dairy & Backery": {
    Dairy: ["Milk", "Ice Cream", "Cheese", "Frozen Custurd", "Yogurt"],
    Backery: ["Bread", "Rust Roast", "Bun", "Cake", "Pastry"],
  },
  "Fruits & Vegetables": {
    Fruits: ["Apple", "Banana", "Orange", "Grapes", "Mango"],
    Vegetables: ["Potato", "Tomato", "Onion", "Carrot", "Cucumber"],
  },
  "Snacks & Spices": {
    Snacks: ["Chips", "Biscuit", "Noodles", "Pasta", "Sauce"],
    Spices: ["Salt", "Sugar", "Pepper", "Cinnamon", "Turmeric"],
  },
  "Drink & Beverage": {
    Drink: ["Water", "Juice", "Soda", "Energy Drink", "Milk Shake"],
    Beverage: ["Tea", "Coffee", "Wine", "Beer", "Whiskey"],
  },
};

function MegaMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2.5 rounded-md border-[1px] border-gray-200 p-2 transition-all duration-300 ease-linear hover:border-emerald-600 hover:text-emerald-600">
        <RiMenu2Line />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="fixed left-[-15px] top-4 max-[340px]:left-[-40px] ">
        <Tabs
          defaultValue={"Dairy & Backery"}
          className="flex gap-4 p-3 max-sm:flex-col "
        >
          <TabsList className="m-0 grid   justify-start gap-1 bg-transparent p-0 pr-1 text-left max-sm:grid-cols-2  ">
            {Object.keys(Categories).map((category, i) => (
              <TabsTrigger
                key={i}
                value={category}
                className="flex h-full w-[180px] justify-start  whitespace-nowrap border-[1px] border-gray-200   text-zinc-800 hover:border-emerald-600 hover:text-emerald-600 max-sm:w-auto max-sm:text-[12px]"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(Categories).map(([category, subCategories], i) => (
            <TabsContent
              key={i}
              value={category}
              className="mt-0 w-[380px] border-none px-5 py-2 max-sm:w-[300px] "
            >
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(subCategories).map(
                  ([subCategory, items], i) => (
                    <div key={i}>
                      <h2 className="pb-4 font-bold text-emerald-600">
                        {subCategory}
                      </h2>
                      <ul className="grid gap-4 max-[340px]:gap-2">
                        {items.map((item, i) => (
                          <li
                            key={i}
                            className="cursor-pointer text-sm text-zinc-500 hover:text-emerald-600 max-[340px]:text-[12px]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ),
                )}
              </div>
            </TabsContent>
          ))}
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export function NavigationSection() {
  return (
    <div className="flex flex-col border-y-2 py-4">
      <div className="section-box-w gap-15 section-px mx-auto flex items-center justify-between gap-5 max-md:flex-wrap">
        <MegaMenu />

        <span className="my-auto flex gap-4 self-start justify-self-start max-md:hidden max-md:max-w-full max-md:flex-wrap">
          {[
            {
              text: "Juices",
              url: `${Paths.shop.path}?category=juice`,
              icon: <BiDrink />,
            },
            {
              text: "Fruits",
              url: `${Paths.shop.path}?category=fruit`,
              icon: <GiFruitBowl />,
            },
            {
              text: "Dairy",
              url: `${Paths.shop.path}?category=cheese`,
              icon: <GiSlicedBread />,
            },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.url}
              className="flex-center gap-3 transition-all duration-300 ease-in-out hover:text-emerald-600"
            >
              {item.icon}
              <div className="grow self-start whitespace-nowrap text-base max-md:text-sm   ">
                {item.text}
              </div>
            </Link>
          ))}
        </span>

        <span className="my-auto flex items-center gap-2.5 self-center">
          <AiOutlineThunderbolt size="20" />

          <div className="my-auto grow self-center whitespace-nowrap text-base leading-7 text-zinc-800 text-opacity-80">
            UP TO 60% off All Items
          </div>
        </span>
      </div>
    </div>
  );
}

export function Breadcrumb() {
  const [text, settext] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.query.category) {
      settext((router.query.category as string).toLocaleUpperCase());
      return;
    }
    settext(router.pathname.split("/").pop()?.toLocaleUpperCase() ?? "");
  }, [router.pathname, router.query.category]);

  return (
    <>
      <div className="text-base leading-7 text-zinc-800">HOME</div>
      <div className="text-base leading-7 text-zinc-800">/</div>
      <div className="text-sm leading-7 text-zinc-800 text-opacity-80">
        {text}
      </div>
    </>
  );
}

export default function MainHeader() {
  const { total } = useCartStore();

  const [cTotal, setcTotal] = useState(0);

  useEffect(() => setcTotal(total), [total]);

  return (
    <div
      className={`section-px section-box-w mx-auto flex items-center justify-between gap-20   py-10  max-lg:justify-between max-md:flex-wrap max-md:gap-5 max-md:py-5`}
    >
      <Link
        href={Paths.home.path}
        className="text-nowrap max-md:order-1 max-md:self-start"
      >
        <div className="text-[30px]   font-light uppercase max-md:text-2xl">
          E-shopper
        </div>
      </Link>
      <SearchProducts />
      <div className="flex w-full max-w-[116px] items-center justify-end gap-5 pr-3 max-md:order-2 max-md:self-end">
        {/* <div className="relative">
          <UserButton />
        </div> */}
        {/* <Link href="/wishlist" className="relative">
          <div className="relative">
            <WishIcon />
            <WishCount />
          </div>
        </Link> */}
        <Link href={Paths.cart.path} className="relative">
          <IoCartOutline size={30} />
          <div className="absolute right-[-10px] top-[-8px] flex h-4  items-center justify-center rounded-full bg-blue-600 px-1 align-middle text-[10px] text-white">
            {cTotal}
          </div>
        </Link>
      </div>
    </div>
  );
}
