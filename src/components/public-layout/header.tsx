import { CartIcon, WishIcon } from "@/lib/icons";
import { gs } from "@/pages";
import { UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: sessionData } = useSession();
  return (
    <div
      className={`mx-auto  flex py-10 max-w-[${gs.maxW}] items-center justify-between gap-5 max-xl:px-4 max-md:flex-wrap`}
    >
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/36f9cdb27d1c00c7ed8c7d92f401a5ca2ebd653b144a7499d3d30d5a29832157?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/36f9cdb27d1c00c7ed8c7d92f401a5ca2ebd653b144a7499d3d30d5a29832157?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/36f9cdb27d1c00c7ed8c7d92f401a5ca2ebd653b144a7499d3d30d5a29832157?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/36f9cdb27d1c00c7ed8c7d92f401a5ca2ebd653b144a7499d3d30d5a29832157?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/36f9cdb27d1c00c7ed8c7d92f401a5ca2ebd653b144a7499d3d30d5a29832157?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/36f9cdb27d1c00c7ed8c7d92f401a5ca2ebd653b144a7499d3d30d5a29832157?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/36f9cdb27d1c00c7ed8c7d92f401a5ca2ebd653b144a7499d3d30d5a29832157?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/36f9cdb27d1c00c7ed8c7d92f401a5ca2ebd653b144a7499d3d30d5a29832157?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
        className="my-auto aspect-[3.62] w-[141px] max-w-full shrink-0 overflow-hidden object-contain object-center"
      />
      <div className="flex max-h-[50px] w-full max-w-[750px] items-stretch justify-between gap-0 self-stretch max-md:max-w-full max-md:flex-wrap">
        <span className="flex  w-full max-w-[150px] items-center justify-center gap-5 border border-solid border-zinc-800 border-opacity-10 ">
          <div className="text-center text-base text-zinc-800 text-opacity-80">
            All tags
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/528b15e6067e0e5abbc44d458e8d5c5bdc2d81ad941fa26a5fb8986774f8fe5f?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
            className="my-auto aspect-[1.67] w-2.5 max-w-full shrink-0 self-center overflow-hidden object-contain object-center"
          />
        </span>
        <div className="flex grow basis-[0%] flex-col items-end justify-center border border-solid border-zinc-800 border-opacity-10 max-md:max-w-full max-md:pl-5">
          <input
            type="text"
            className="h-full w-full border border-solid border-zinc-800 border-opacity-10 pl-4"
          />
          <span className="absolute">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2eedb4369e4c6c5540db074793bc03e0566864459364db450b723fea7a4985fa?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
              className="aspect-[1.1] w-[42px] max-w-full overflow-hidden object-contain object-center"
            />
          </span>
        </div>
      </div>
      <div className="flex w-full max-w-[116px] justify-end gap-5">
        <div className="relative">
          <UserIcon />
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
  );
}
