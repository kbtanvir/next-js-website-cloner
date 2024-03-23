import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Paths } from "@/lib/const/navigation";
import Link from "next/link";
import { RiCloseLine, RiMenu2Line } from "react-icons/ri";
import { Button } from "../components/button";
import { LinkText } from "../theme";

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
          url: `#welcome`,
        },
        {
          text: "About",
          url: `#about`,
        },
        {
          text: "Rent",
          url: `#rent`,
        },
        {
          text: "Agents",
          url: `#agents`,
        },
      ].map((item, i) => (
        <LinkText
          key={i}
          className=" py-4 uppercase hover:border-purple-500 max-md:border-b-2"
        >
          {item.text}
        </LinkText>
      ))}
    </>
  );
}

export default function MainHeader() {
  return (
    <div className="fixed left-0 top-0 z-50 w-full bg-white shadow-lg">
      <div
        className={`section-box-w flex items-center justify-between gap-10 py-5 max-md:gap-5 max-md:gap-y-0 max-md:py-5`}
      >
        <div className="">
          <Link
            href={Paths.home.path}
            className="text-nowrap text-[30px] font-light uppercase max-md:self-start max-md:text-2xl"
          >
            HOME-FINDER{" "}
          </Link>
        </div>

        <div className="">
          {/* mobile nav */}
          <Drawer direction="left">
            <DrawerTrigger className="min-[850px]:hidden">
              <RiMenu2Line />
            </DrawerTrigger>
            <DrawerContent className="h-full max-w-lg rounded-none border-none bg-white px-6 py-6 text-black [&>.bg-muted]:hidden">
              <DrawerClose className="absolute right-6 top-8 ">
                <Button
                  variant={"icon"}
                  className="bg-transparent p-0 text-[30px] text-black"
                >
                  <RiCloseLine />
                </Button>
              </DrawerClose>
              <DrawerHeader className="">
                <span className="grid gap-10">
                  <Link
                    href={Paths.home.path}
                    className=" text-nowrap text-[30px] font-light uppercase max-md:self-start max-md:text-2xl"
                  >
                    HOME-FINDER
                  </Link>
                  <div className="my-auto grid  ">
                    <NavLinks />
                  </div>
                  <Link href={"#"} className="relative">
                    <Button>Get Started</Button>
                  </Link>
                </span>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>

          <div className="flex w-full flex-wrap items-center justify-between gap-10 pr-3 max-[850px]:hidden">
            {/* desktop nav */}
            <span className="my-auto flex gap-10 self-start justify-self-start max-md:max-w-full max-md:flex-wrap">
              <NavLinks />
            </span>
            <Link href={"#"} className="relative">
              <Button>Contact us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
