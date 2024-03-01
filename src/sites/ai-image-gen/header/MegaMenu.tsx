import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiMenu2Line } from "react-icons/ri";
import { Categories } from ".";

export function MegaMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2.5 rounded-md border-[1px] border-gray-200 p-2 transition-all duration-300 ease-linear hover:border-emerald-600 hover:text-emerald-600">
        <RiMenu2Line />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="fixed left-[-15px] top-4 max-[340px]:left-[-40px] ">
        <Tabs
          defaultValue={"Dairy & Backery"}
          className="flex gap-4 p-3 max-sm:flex-col "
        >
          <TabsList className="m-0 grid   justify-start gap-1 bg-transparent p-0 pr-1 text-left max-sm:grid-cols-2  ">
            {Object.keys(Categories).map((category, i) => (
              <TabsTrigger
                key={i}
                value={category}
                className="flex h-full w-[180px] justify-start  whitespace-nowrap border-[1px] border-gray-200   text-zinc-800 hover:border-emerald-600 hover:text-emerald-600 max-sm:w-auto max-sm:text-[12px]"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(Categories).map(([category, subCategories], i) => (
            <TabsContent
              key={i}
              value={category}
              className="mt-0 w-[380px] border-none px-5 py-2 max-sm:w-[300px] "
            >
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(subCategories).map(
                  ([subCategory, items], i) => (
                    <div key={i}>
                      <h2 className="pb-4 font-bold text-emerald-600">
                        {subCategory}
                      </h2>
                      <ul className="grid gap-4 max-[340px]:gap-2">
                        {items.map((item, i) => (
                          <li
                            key={i}
                            className="cursor-pointer text-sm text-zinc-500 hover:text-emerald-600 max-[340px]:text-[12px]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ),
                )}
              </div>
            </TabsContent>
          ))}
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
