import { Button } from "@/components/ui/button";
import { Routes } from "@/pages/sites/eshopper";
import Link from "next/link";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { MegaMenu } from "./MegaMenu";

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

export default function MainHeader() {
  return (
    <div
      className={`section-px section-box-w mx-auto flex items-center justify-between gap-20 py-5 max-md:flex-wrap max-md:gap-5 max-md:py-5`}
    >
      <Link
        href={Routes.home.path}
        className="text-nowrap max-md:order-1 max-md:self-start"
      >
        <div className="text-[30px] font-light uppercase max-md:text-2xl">
          Property
        </div>
      </Link>

      <div className="flex w-full items-center justify-between gap-5 pr-3 max-md:order-2 max-md:self-end">
        <span className="my-auto flex gap-10 self-start justify-self-start max-md:hidden max-md:max-w-full max-md:flex-wrap">
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
              className="flex-center grow gap-3 self-start whitespace-nowrap text-base font-normal transition-all duration-300 ease-in-out hover:text-emerald-600 max-md:text-sm"
            >
              {item.text}
            </Link>
          ))}
        </span>
        <Link href={Routes.cart.path} className="relative">
          <Button>Contact us</Button>
        </Link>
      </div>
    </div>
  );
}

export function NavigationSection() {
  return (
    <div className="flex flex-col border-y-2 py-4">
      <div className="section-box-w gap-15 section-px mx-auto flex items-center justify-between gap-5 max-md:flex-wrap">
        <MegaMenu />

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
