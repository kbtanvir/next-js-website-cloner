import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { OrderByOptions, type IOrderBy } from "@/features/shop/model"
import { SortIcon } from "@/lib/icons"
import { FilterIcon } from "lucide-react"
import { globalStore, useGlobalStore } from "~/utils/global.store"

function formatOrderByText(orderBy: IOrderBy) {
  const fields = {
    createdAt_asc: "Newest",
    createdAt_desc: "Oldest",
    price_asc: "Price: Low to High",
    price_desc: "Price: High to Low",
  }

  return fields[orderBy]
}
export function PageTitle({ title = "" }: { title?: string }) {
  const {
    productsQueryDTO: { sort, limit },
    showSidebar,
  } = useGlobalStore()

  function handleOrderByClick(orderBy: IOrderBy) {
    globalStore.setProductsQueryDTO((s) => ({
      ...s,
      sort: orderBy,
    }))
  }

  return (
    <div className="bg-slate-100 py-5">
      <span className="mx-auto flex  w-full items-center justify-end max-md:justify-between gap-5 section-box-w max-md:flex-wrap section-px">
        <span
          onClick={() => globalStore.setShowSidebar(!showSidebar)}
          className={`md:hidden rounded-lg border-1 border-solid border-black border-opacity-10 px-2 py-1.5 text-center text-xs   text-black hover:bg-gray-900 hover:text-white hover:cursor-pointer bg-gray-200`}
        >
          <FilterIcon size={16} />
        </span>

        <span className="flex self-end gap-3.5  ">
          {/* <ColumnSizeIcon size={columnSize} /> */}
          <div className="my-auto self-center text-center text-base leading-5 text-black">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-3 border border-solid border-black border-opacity-10 bg-white px-3.5 py-1.5 text-center text-xs leading-3 text-black">
                <SortIcon />
                <span>{formatOrderByText(sort ?? "createdAt_desc")}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0 border-none">
                {OrderByOptions.map((item, i) => (
                  <DropdownMenuLabel
                    key={i}
                    onClick={() => handleOrderByClick(item)}
                    className={`${
                      sort === item ? "bg-gray-900 text-white" : "bg-white"
                    } hover:bg-gray-900 hover:text-white hover:cursor-pointer `}
                  >
                    {formatOrderByText(item)}
                  </DropdownMenuLabel>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="my-auto grow self-center whitespace-nowrap text-base leading-5 text-black">
            <DropdownMenu>
              <DropdownMenuTrigger
                className="
               border border-solid border-black border-opacity-10 bg-white px-3.5 py-1.5 text-center text-xs leading-3 text-black
              "
              >
                Show {limit}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0 border-none">
                {[10, 20, 50].map((item, i) => (
                  <DropdownMenuLabel
                    key={i}
                    onClick={() =>
                      globalStore.setProductsQueryDTO((s) => ({
                        ...s,
                        limit: item,
                      }))
                    }
                    className={`${
                      limit === item ? "bg-gray-900 text-white" : "bg-white"
                    } hover:bg-gray-900 hover:text-white hover:cursor-pointer `}
                  >
                    {item}
                  </DropdownMenuLabel>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </span>
      </span>
    </div>
  )
}
