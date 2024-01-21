import Image from "next/image"

export function FooterSection() {
  return (
    <div className="mt-20  flex w-full flex-col items-stretch bg-slate-50 px-12 py-11 max-md:mt-10 max-md:max-w-full max-md:px-5">
      <div className="max-w-[1500px] mx-auto w-full">
        <div className="mt-9 flex w-full items-start justify-between gap-10 max-md:max-w-full max-md:flex-wrap">
          <div className="max-w-[400px] w-full">
            <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex  flex-col items-stretch max-md:ml-0 max-md:w-full">
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
            </div>
          </div>
          <span className="flex flex-col flex-1 items-stretch  ">
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
          <div className="  flex flex-1 flex-col items-stretch max-md:ml-0 max-md:w-full">
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
          <span className="flex flex-1 flex-col items-stretch">
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
        <span className="mt-9 flex items-center relative justify-between gap-5 w-full max-md:flex-wrap">
          <div className="my-auto  text-base leading-4 text-zinc-800 text-opacity-80">
            © 2024, Developed By K. B. Tanvir
          </div>
          <Image
            alt=""
            // loading="lazy"
            src="/images/footerlogos.png"
            className="max-w-full object-contain"
            // layout="fill"
            height={24}
            width={278}
          />
        </span>
      </div>
    </div>
  )
}
