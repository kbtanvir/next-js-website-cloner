import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Routes } from "@/pages/sites/eshopper";
import Link from "next/link";
import { RiCloseLine, RiMenu2Line } from "react-icons/ri";

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

function NavLinks() {
  return (
    <>
      {[
        {
          text: "Home",
          url: `${Routes.shop.path}?category=juices`,
        },
        {
          text: "About",
          url: `${Routes.shop.path}?category=fruits`,
        },
        {
          text: "Rent",
          url: `${Routes.shop.path}?category=dairy`,
        },
        {
          text: "Agents",
          url: `${Routes.shop.path}?category=dairy`,
        },
        {
          text: "Contact",
          url: `${Routes.shop.path}?category=dairy`,
        },
      ].map((item, i) => (
        <Link
          key={i}
          href={item.url}
          className="self-start whitespace-nowrap text-base font-normal transition-all duration-300 ease-in-out hover:text-emerald-600 max-[850px]:py-4 max-md:text-sm"
        >
          {item.text}
        </Link>
      ))}
    </>
  );
}

export default function MainHeader() {
  return (
    <div className="fixed left-0 top-0 z-50 w-full bg-white">
      <div
        className={`section-box-w flex items-center justify-between gap-10 py-5 max-md:gap-5 max-md:gap-y-0 max-md:py-5`}
      >
        <div className="">
          <Link
            href={Routes.home.path}
            className="text-nowrap text-[30px] font-light uppercase max-md:self-start max-md:text-2xl"
          >
            Property{" "}
          </Link>
        </div>

        <div className="">
          {/* mobile nav */}
          <Drawer direction="left">
            <DrawerTrigger className="min-[850px]:hidden">
              <RiMenu2Line />
            </DrawerTrigger>
            <DrawerContent className="h-full max-w-lg rounded-none px-6 py-6">
              <DrawerClose className="absolute right-6 top-6 ">
                <Button variant="outline">
                  <RiCloseLine />
                </Button>
              </DrawerClose>
              <DrawerHeader className="">
                <span className="grid gap-10">
                  <Link
                    href={Routes.home.path}
                    className=" text-nowrap text-[30px] font-light uppercase max-md:self-start max-md:text-2xl"
                  >
                    Property
                  </Link>
                  <div className="my-auto grid divide-y-2">
                    <NavLinks />
                  </div>
                  <Link href={Routes.cart.path} className="relative">
                    <Button>Contact us</Button>
                  </Link>
                </span>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>

          <div className="flex w-full flex-wrap items-center justify-between gap-5 pr-3 max-[850px]:hidden">
            {/* desktop nav */}
            <span className="my-auto flex gap-10 self-start justify-self-start max-md:max-w-full max-md:flex-wrap">
              <NavLinks />
            </span>
            <Link href={Routes.cart.path} className="relative">
              <Button>Contact us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
