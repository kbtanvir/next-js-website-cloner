import { ColumnSizeIcon } from "@/components/ColumnSizeIcon"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { OrderByOptions, type IOrderBy } from "@/features/shop/model"
import { SortIcon } from "@/lib/icons"
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
export function PageTitle() {
  const {
    productsQueryDTO: { sort, limit },
    columnSize,
  } = useGlobalStore()

  function handleOrderByClick(orderBy: IOrderBy) {
    globalStore.setProductsQueryDTO((s) => ({
      ...s,
      sort: orderBy,
    }))
  }

  return (
    <div className="bg-slate-100 p-6 max-w-[1500px] mx-auto">
      <span className="mx-auto flex  w-full items-center justify-between gap-5 self-stretch max-md:max-w-full max-md:flex-wrap max-md:px-5">
        <div className="my-auto text-2xl font-semibold uppercase leading-8 text-zinc-800">
          Products
        </div>
        <span className="flex items-start justify-between gap-3.5 self-stretch">
          <ColumnSizeIcon size={columnSize} />

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
