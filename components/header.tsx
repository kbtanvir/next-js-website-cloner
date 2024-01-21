import UserButton from "@/components/user-button"
import { CartIcon, WishIcon } from "@/lib/icons"
import Link from "next/link"
import { Fragment } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { useGlobalStore } from "~/utils/global.store"

export function TopBar() {
  return (
    <div className=" flex flex-col items-stretch bg-blue-800 p-3.5 ">
      <span
        className={`mx-auto flex w-full max-w-[1500px] items-stretch justify-between gap-5 max-md:flex-wrap`}
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c16a4058403d9f8ed01fafc12e0ddc93676b0c3a2bbf7cf9bb1f37e4b9a17788?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
          className="aspect-[6.5] w-[117px] max-w-full shrink-0 overflow-hidden object-contain object-center"
        />

        <div className="text-sm leading-5 text-white">
          Enter WINTERZ to get 30% off
        </div>
        <span className="my-auto flex items-start justify-between gap-1.5 self-center max-sm:hidden">
          <div className="grow whitespace-nowrap text-center text-sm leading-6 text-white">
            United States USD $
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7f2c1fbaf0819b89a5925bf10413f4df593da17a95e4046f8fa5eaff36fe0885?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
            className="my-auto aspect-[1.43] w-2.5 max-w-full shrink-0 self-center overflow-hidden object-contain object-center"
          />
          <div className="text-center text-sm leading-6 text-white">
            English
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3055743a69c374d1ed87136da7b17b0670e578a5744d2c4b6600703c2849c285?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
            className="my-auto aspect-[1.43] w-2.5 max-w-full shrink-0 self-center overflow-hidden object-contain object-center"
          />
        </span>
      </span>
    </div>
  )
}
export function MainHeader() {
  const { productCounts } = useGlobalStore()
  return (
    <div
      className={`mx-auto py-9 flex max-w-[1500px] items-center justify-between gap-15 max-xl:px-8 max-md:flex-wrap`}
    >
      <Link href="/">
        <h1 className="text-[30px] font-bold uppercase">E-shoper</h1>
      </Link>
      <div className="flex w-full  max-w-[750px] items-stretch justify-between gap-0 self-stretch max-md:max-w-full max-md:flex-wrap">
        <input
          type="text"
          className="h-[50px] w-full border border-solid border-zinc-800 border-opacity-10 pl-4"
        />
        <span className="absolute">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2eedb4369e4c6c5540db074793bc03e0566864459364db450b723fea7a4985fa?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
            className="aspect-[1.1] w-[55px] max-w-full overflow-hidden object-contain object-center"
          />
        </span>
      </div>
      <div className="flex w-full max-w-[116px] justify-end gap-5 items-center">
        <div className="relative">
          <UserButton />
        </div>
        <Link href="/wishlist" className="relative">
          <div className="relative">
            <WishIcon />
            <div className="absolute right-[-5px] top-[-8px] flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 align-middle text-[10px] text-white">
              {productCounts?.wishlist}
            </div>
          </div>
        </Link>
        <div className="relative">
          <CartIcon />
          <div className="absolute right-[-5px] top-[-8px] flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 align-middle text-[10px] text-white">
            {productCounts?.cart}
          </div>
        </div>
      </div>
    </div>
  )
}
export function NavigationSection() {
  return (
    <div className="flex flex-col border-y-2 py-4">
      <div className="mx-auto w-full flex max-w-[1500px] items-center justify-between gap-15 max-xl:px-8 max-md:flex-wrap ">
        <span className="flex items-stretch justify-between gap-3">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/10ee5ad50561b854f62cf8cd05183ec228a0548a5b88abaa897f13240c2f1994?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
            className="aspect-square w-7 max-w-full shrink-0 overflow-hidden object-contain object-center"
          />
          <div className="my-auto grow self-center whitespace-nowrap text-center text-base leading-7 text-zinc-800">
            All Categories
          </div>
        </span>
        <span className="my-auto flex items-start justify-between gap-2 self-center max-md:max-w-full max-md:flex-wrap">
          {[
            {
              text: "Men",
              url: "?category=men",
            },
            {
              text: "Women",
              url: "/category=women",
            },
            {
              text: "Kids",
              url: "/category=kids",
              hasChildren: false,
            },
            {
              text: "FAQs",
              url: "/category=kids",
              hasChildren: false,
            },
          ].map((item, i) => (
            <Fragment key={i}>
              <div className="grow self-start whitespace-nowrap text-lg leading-5 text-zinc-800">
                {item.text}
              </div>
              <IoIosArrowDown />
            </Fragment>
          ))}
        </span>
        <span className="my-auto flex items-stretch gap-2.5 self-center">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/41dc93115a721eba561af1b7ef7cd4226356a50abddb14c79d389140a82be3a1?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
            className="aspect-square w-5 max-w-full shrink-0 overflow-hidden object-contain object-center"
          />
          <div className="my-auto grow self-center whitespace-nowrap text-base leading-7 text-zinc-800 text-opacity-80">
            UP TO 60% off All Items
          </div>
        </span>
      </div>
    </div>
  )
}
export function Breadcrumb() {
  return (
    <span className="flex max-w-[1500px] mx-auto py-5 gap-5 self-start">
      <div className="text-base leading-7 text-zinc-800">Home</div>
      <div className="text-sm leading-7 text-zinc-800 text-opacity-80">
        / Products
      </div>
    </span>
  )
}
