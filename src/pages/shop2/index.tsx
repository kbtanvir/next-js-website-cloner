import { Sidebar } from "@/components/sidebar"
import UserButton from "@/components/user-button"
import { CartIcon, WishIcon } from "@/lib/icons"
import Image from "next/image"
import { Fragment } from "react"
import { IoIosArrowDown, IoMdHeartEmpty } from "react-icons/io"
import { IoCartOutline, IoGitCompareOutline } from "react-icons/io5"

export default function ShopPage() {
  return (
    <div>
      <TopBar />
      <MainHeader />
      <NavigationSection />
      <ContentSection />
      <RelatedProductSection />
      <FooterSection />
    </div>
  )
}

function TopBar() {
  return (
    <div className=" flex flex-col items-stretch bg-blue-800 p-3.5 ">
      <span
        className={`mx-auto flex w-full max-w-[1200px] items-stretch justify-between gap-5 max-md:flex-wrap`}
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
function MainHeader() {
  return (
    <div
      className={`mx-auto py-9 flex max-w-[1200px] items-center justify-between gap-15 max-xl:px-8 max-md:flex-wrap`}
    >
      <div>
        <h1 className="text-[30px] font-bold uppercase">E-shoper</h1>
      </div>
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
          {/* TODO: Wishlist and cart */}
          {/* <Menu>
            <Menu.Button>
              <UserIcon />
            </Menu.Button>
            <Menu.Items
              className={
                "t-10 absolute grid w-[200px] grid-cols-1 overflow-hidden rounded-md bg-white shadow-md"
              }
            >
              {[
                { href: "/account-settings", label: "Account settings" },
                { href: "/sign-out", label: "Sign out" },
              ].map((link) => (
                <Menu.Item
                  as="a"
                  key={link.href}
                  href={link.href}
                  className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white  ui-not-active:text-black p-4 hover:bg-gray-50"
                >
                  {link.label}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu> */}
        </div>

        <div className="relative">
          <WishIcon />
          <div className="absolute right-[-5px] top-[-8px] flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 align-middle text-[10px] text-white">
            0
          </div>
        </div>
        <div className="relative">
          <CartIcon />
          <div className="absolute right-[-5px] top-[-8px] flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 align-middle text-[10px] text-white">
            0
          </div>
        </div>
      </div>
    </div>
  )
}
function NavigationSection() {
  return (
    <div className="flex flex-col border-y-2 py-4">
      <div className="mx-auto w-full flex max-w-[1200px] items-center justify-between gap-15 max-xl:px-8 max-md:flex-wrap ">
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
function Breadcrumb() {
  return (
    <span className="flex max-w-[1200px] mx-auto py-5 gap-5 self-start">
      <div className="text-base leading-7 text-zinc-800">Home</div>
      <div className="text-sm leading-7 text-zinc-800 text-opacity-80">
        / Products
      </div>
    </span>
  )
}
function PageTitle() {
  return (
    <div className="bg-slate-100 p-6 max-w-[1200px] mx-auto">
      <span className="mx-auto flex  w-full items-center justify-between gap-5 self-stretch max-md:max-w-full max-md:flex-wrap max-md:px-5">
        <div className="my-auto text-2xl uppercase leading-8 text-zinc-800">
          Products
        </div>
        <span className="flex items-start justify-between gap-3.5 self-stretch">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bfa6f911ce29139cf7255bf1929f1292ae9c9619d76413ba568587e6c35ed1a8?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
            className="aspect-[3.81] w-20 max-w-full shrink-0 self-stretch overflow-hidden object-contain object-center"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/84b8c8cff6604c1b46e27128a2b6760e65a4a18dacc915c36bf1b52f9e5432d5?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
            className="my-auto aspect-[1.6] w-4 max-w-full shrink-0 self-center overflow-hidden object-contain object-center"
          />
          <div className="my-auto self-center text-center text-base leading-5 text-black">
            SORT BY
          </div>
          <div className="my-auto grow self-center whitespace-nowrap text-sm leading-5 text-black">
            139 products
          </div>
        </span>
      </span>
    </div>
  )
}

function ProductItem() {
  return (
    <div className="flex-col items-stretch w-full max-md:ml-0 max-md:w-full">
      <span className="flex flex-col items-stretch max-md:mt-9 ">
        <div className="relative flex h-[350px] w-fullflex-col border-[1px] border-solid border-black ">
          <Image
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ec6f0aaca54972c8127524967d38c5aa1824003e5103adfe9a7ca92f365d5b9"
            className="absolute  object-cover object-center"
            layout="fill"
            alt=""
          />

          <div className=" absolute top-0 flex flex-col w-full items-stretch border  pb-px pt-2.5">
            <div className="flex flex-col items-stretch px-3">
              <div className="absolute">
                <span className="mt-1 max-w-[58px] items-stretch justify-center whitespace-nowrap rounded-md border border-solid border-white border-opacity-10 bg-neutral-900 px-3.5 py-1.5 text-center text-xs leading-3 text-white">
                  -21%
                </span>
              </div>
              <div className="absolute flex flex-col items-center gap-2.5 self-end">
                <div className="flex bg-white shadow-lg p-1.5 rounded-lg self-end">
                  <IoMdHeartEmpty fontSize={25} />
                </div>
                {/* TODO: add quickview */}
                <div className="flex bg-white shadow-lg p-1.5 rounded-lg self-end">
                  <IoGitCompareOutline fontSize={25} />
                </div>
              </div>
            </div>
          </div>
          <div className=" absolute bottom-0  flex-center w-full bg-black px-4 py-2.5 max-md:mt-10 max-md:px-5">
            <span className="flex items-center gap-5">
              <IoCartOutline color="white" size="26" />
              <div className="my-auto   text-base leading-5 text-white">
                Add to cart
              </div>
            </span>
          </div>
        </div>
        <div className="mt-6 text-base leading-5 text-zinc-800">
          Art Deco design movement watch
        </div>
        <span className="mt-4 flex items-stretch gap-3 self-start">
          <div className="text-base text-zinc-800 text-opacity-80">$70.00</div>
          <div className="text-base text-zinc-800">$55.00</div>
        </span>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/540f62635d1b5749940b5d69388ce7bbd06d7027f48a8c81a5e7a5995b4e69ca?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
          className="mt-5 aspect-[4.05] w-[77px] max-w-full self-start overflow-hidden object-contain object-center"
        />
      </span>
    </div>
  )
}

function ProductGrid() {
  return (
    <div className="grid grid-cols-3 gap-10">
      {[...Array<number>(6)].map((_, i) => (
        <ProductItem key={i} />
      ))}
    </div>
  )
}
function Pagination() {
  return (
    <span className="w-full mt-20 flex  gap-5 self-start max-md:mt-10">
      {[1, 2, 3, 4].map((_, i) => (
        <span className="aspect-square bg-slate-100 w-10 flex-center" key={i}>
          {_}
        </span>
      ))}
    </span>
  )
}
function ContentSection() {
  return (
    <span className="mx-auto w-full">
      <Breadcrumb />
      <PageTitle />
      <div className="mt-20">
        <div className="flex max-w-[1200px] w-full mx-auto  justify-between gap-5">
          <Sidebar />
          <div>
            <ProductGrid />
            <Pagination />
          </div>
        </div>
      </div>
    </span>
  )
}
function RelatedProductSection() {
  return (
    <div className="ml-12 mr-12 mt-20 px-px max-md:mr-2.5 max-md:mt-10 max-md:max-w-full">
      <div className="mb-40 self-center whitespace-nowrap text-center text-3xl leading-10 text-zinc-800 max-md:mt-10">
        You may also like
      </div>
      <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
        {[...Array<number>(4)].map((_, i) => (
          <ProductItem key={i} />
        ))}
      </div>
    </div>
  )
}
function FooterSection() {
  return (
    <div className="mt-20 flex w-full flex-col items-stretch bg-slate-50 px-12 py-11 max-md:mt-10 max-md:max-w-full max-md:px-5">
      <div className="mt-9 flex w-full items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
        <div className="self-stretch max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex w-[73%] flex-col items-stretch max-md:ml-0 max-md:w-full">
              <span className="flex flex-col items-start max-md:mt-10">
                <div className="self-stretch text-xl leading-7 text-zinc-800">
                  About us
                </div>
                <div className="mt-10 self-stretch text-base leading-7 text-zinc-800 text-opacity-80">
                  The exciting contemporary brand Suruchi is known for its
                  attention to detail and premium graphics.
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f50b1c6fe9216c4d80b906f1e8e375ec3dad4c66b0461c174eafa3e362adfca3?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
                  className="mt-9 aspect-[6.5] w-[117px] max-w-full overflow-hidden object-contain object-center"
                />
              </span>
            </div>
            <div className="ml-5 flex w-[27%] flex-col items-stretch max-md:ml-0 max-md:w-full">
              <span className="flex grow flex-col items-stretch max-md:mt-10">
                <div className="whitespace-nowrap text-xl leading-7 text-zinc-800">
                  Quick Links
                </div>
                <div className="mt-9 text-base leading-7 text-zinc-800 text-opacity-80">
                  FAQ
                </div>
                <div className="mt-5 whitespace-nowrap text-base leading-7 text-zinc-800 text-opacity-80">
                  Find store location
                </div>
                <div className="mt-6 text-sm leading-7 text-zinc-800 text-opacity-80">
                  Privacy Policy
                </div>
                <div className="mt-5 text-base leading-7 text-zinc-800 text-opacity-80">
                  Refund Policy
                </div>
                <div className="mt-5 whitespace-nowrap text-sm leading-7 text-zinc-800 text-opacity-80">
                  Terms of Service
                </div>
              </span>
            </div>
          </div>
        </div>
        <span className="flex basis-[0%] flex-col items-stretch self-stretch">
          <div className="text-xl leading-7 text-zinc-800">Company</div>
          <div className="mt-9 text-base leading-7 text-zinc-800 text-opacity-80">
            Wishlist
          </div>
          <div className="mt-6 text-sm leading-7 text-zinc-800 text-opacity-80">
            My account
          </div>
          <div className="mt-5 whitespace-nowrap text-sm leading-7 text-zinc-800 text-opacity-80">
            Product compare
          </div>
          <div className="mt-5 text-sm leading-7 text-zinc-800 text-opacity-80">
            Cart
          </div>
          <div className="mt-6 text-base leading-7 text-zinc-800 text-opacity-80">
            About us
          </div>
        </span>
        <span className="flex grow basis-[0%] flex-col items-stretch">
          <div className="text-xl leading-7 text-zinc-800">Newsletter</div>
          <div className="mt-10 whitespace-nowrap text-base leading-7 text-zinc-800 text-opacity-80">
            Write your email first to know about our latest offers
          </div>
          <div className="mt-8 flex w-full items-stretch justify-between gap-5 rounded bg-white px-3.5 py-3 shadow-sm">
            <span className="flex items-stretch justify-between gap-3.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/391e0b03145e8698097e4f8cdc1aae8d081d85acab35d943115bd41df4128a45?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
                className="aspect-square w-6 max-w-full shrink-0 overflow-hidden object-contain object-center"
              />
              <div className="my-auto grow self-center whitespace-nowrap text-base leading-7 text-zinc-800 text-opacity-80">
                Your email address
              </div>
            </span>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/270f9c6d291cd3059a97d06cb20443766b9e0b7829984bbce6edc35a08e6c828?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
              className="aspect-square w-6 max-w-full shrink-0 overflow-hidden object-contain object-center"
            />
          </div>
        </span>
      </div>
      <div className="mt-20 flex h-px shrink-0 flex-col bg-zinc-800 bg-opacity-10 max-md:mt-10 max-md:max-w-full" />
      <span className="mt-9 flex items-center justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
        <div className="my-auto w-[258px] text-base leading-4 text-zinc-800 text-opacity-80">
          © 2024, Developed By K. B. Tanvir
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/89bfac9bd8cb9133506acdcd19a906d868f439638e61e4c1efcaa24ac387009b?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
          className="aspect-[11.58] w-[278px] max-w-full shrink-0 self-stretch overflow-hidden object-contain object-center"
        />
      </span>
    </div>
  )
}
