import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Paths, siteNavigation } from "@/lib/const/navigation";
import { useGlobalStore } from "@/utils/global.store";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { RiCloseLine, RiMenu2Line } from "react-icons/ri";
import { Button } from "../components/button";
import { LinkText, classes } from "../theme";

function NavLinks() {
  return (
    <>
      {[
        {
          text: "Home",
          url: "#home",
        },
        {
          text: "About",
          url: `#about`,
        },
        {
          text: "Services",
          url: "#services",
        },
        {
          text: "Case studies",
          url: "#works",
        },
      ].map((item, i) => (
        <Link href={item.url} key={i}>
          <LinkText
            className={`${classes.linkMobileHover} border-b-white/20 py-4 max-md:border-b-[1px]`}
          >
            {item.text}
          </LinkText>
        </Link>
      ))}
    </>
  );
}

function HeaderElements() {
  return (
    <div
      className={`section-box-w flex items-center justify-between gap-20 py-5 max-md:gap-5 max-md:gap-y-0 max-md:py-5`}
    >
      <div className="">
        <Link
          href={siteNavigation.agency.home.path}
          className="text-nowrap text-[30px] font-light uppercase max-md:self-start max-md:text-2xl"
        >
          Agency
        </Link>
      </div>

      <div className="flex w-full justify-end">
        {/* mobile nav */}
        <Drawer direction="left">
          <DrawerTrigger className="min-[850px]:hidden">
            <RiMenu2Line />
          </DrawerTrigger>
          <DrawerContent className="h-full max-w-lg rounded-none border-none px-6 py-6 [&>.bg-muted]:hidden">
            <DrawerClose className="absolute right-6 top-6 ">
              <div
                className={`flex-center size-10 rounded-full p-2 text-xl text-black ${classes.ringColor} ${classes.hoverBg} ring-2`}
              >
                <RiCloseLine />
              </div>
            </DrawerClose>
            <DrawerHeader className="">
              <span className="grid gap-10">
                <Link
                  href={siteNavigation.agency.home.path}
                  className=" text-nowrap text-[30px] font-light uppercase max-md:self-start max-md:text-2xl"
                >
                  Agency
                </Link>
                <div className="my-auto grid">
                  <NavLinks />
                </div>
                <Link href={Paths.cart.path} className="relative">
                  <Button>Get Started</Button>
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
          <Link href={Paths.cart.path} className="relative">
            <Button>Get a Free Quote</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const { navBarFixed } = useGlobalStore();

  return (
    <AnimatePresence initial>
      {navBarFixed && (
        <motion.div
          className="fixed left-0 top-0 z-50 w-full bg-white shadow-lg"
          key={"fixed-navbars"}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
          }}
        >
          <HeaderElements />
        </motion.div>
      )}
      <motion.div className="absolute left-0 top-0 z-50 w-full bg-transparent  text-white">
        <HeaderElements />
      </motion.div>
    </AnimatePresence>
  );
}
