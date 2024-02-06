import { ToyBrickIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IoFemale, IoMale } from "react-icons/io5"

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
export function NavigationSection() {
  return (
    <div className="flex flex-col border-y-2 py-4">
      <div className="mx-auto w-full flex max-w-[1500px] items-center justify-between gap-15 max-xl:px-8 max-md:flex-wrap ">
        {/* <span className="flex items-stretch justify-between gap-3">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/10ee5ad50561b854f62cf8cd05183ec228a0548a5b88abaa897f13240c2f1994?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
            className="aspect-square w-7 max-w-full shrink-0 overflow-hidden object-contain object-center"
          />
          <div className="my-auto grow self-center whitespace-nowrap text-center text-base leading-7 text-zinc-800">
            All Categories
          </div>
        </span> */}
        <span className="my-auto flex self-center place-items-center justify-between gap-4   max-md:max-w-full max-md:flex-wrap">
          {[
            {
              text: "Men",
              url: "?category=men",
              icon: <IoMale size={22} />,
            },
            {
              text: "Women",
              url: "?category=women",
              icon: <IoFemale size={22} />,
            },
            {
              text: "Kids",
              url: "?category=kids",
              hasChildren: false,
              icon: <ToyBrickIcon />,
            },
          ].map((item, i) => (
            <Link key={i} href={item.url} className="flex-center gap-3">
              {item.icon}
              <div className="grow self-start whitespace-nowrap text-lg leading-5 text-zinc-800">
                {item.text}
              </div>
            </Link>
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
  const [text, settext] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (router.query.category) {
      settext((router.query.category as string).toLocaleUpperCase())
      return
    }
    settext(router.pathname.split("/").pop()?.toLocaleUpperCase() ?? "")
  }, [router.pathname, router.query.category])

  return (
    <div className="flex    gap-5 self-start">
      <div className="text-base leading-7 text-zinc-800">HOME</div>
      <div className="text-base leading-7 text-zinc-800">/</div>
      <div className="text-sm leading-7 text-zinc-800 text-opacity-80">
        {text}
      </div>
    </div>
  )
}
