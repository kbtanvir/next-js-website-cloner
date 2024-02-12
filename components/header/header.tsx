import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AiOutlineThunderbolt } from "react-icons/ai"
import { IoCarOutline, IoFemale, IoMale } from "react-icons/io5"

export function TopBar() {
  return (
    <div className="flex flex-col bg-blue-800 py-3.5 section-px">
      <span
        className={`mx-auto flex w-full max-w-[1500px] items-stretch justify-between gap-5 max-md:flex-wrap`}
      >
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
      <div className="mx-auto flex section-box-w items-center justify-between gap-15 max-md:flex-wrap gap-5 section-px">
        <div className="flex gap-5 self-start min-w-[300px] max-sm:hidden">
          <Breadcrumb />
        </div>

        <span className="my-auto flex self-center place-items-center justify-between gap-4   max-md:max-w-full max-md:flex-wrap">
          {[
            {
              text: "Men",
              url: "/?category=men",
              icon: <IoMale className="text-[22px] max-md:text-[16px]" />,
            },
            {
              text: "Women",
              url: "/?category=women",
              icon: <IoFemale className="text-[22px] max-md:text-[16px]" />,
            },
            {
              text: "Kids",
              url: "/?category=kids",
              hasChildren: false,
              icon: <IoCarOutline className="text-[22px] max-md:text-[16px]" />,
            },
          ].map((item, i) => (
            <Link key={i} href={item.url} className="flex-center gap-3">
              {item.icon}
              <div className="grow self-start whitespace-nowrap uppercase text-base max-md:text-sm leading-5 text-zinc-800">
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
    <>
      <div className="text-base leading-7 text-zinc-800">HOME</div>
      <div className="text-base leading-7 text-zinc-800">/</div>
      <div className="text-sm leading-7 text-zinc-800 text-opacity-80">
        {text}
      </div>
    </>
  )
}
