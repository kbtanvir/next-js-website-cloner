import { Button } from "@/components/ui/button"
import { globalStore } from "~/utils/global.store"

export function ColumnSizeIcon({ size = 5 }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="text-sm leading-5 text-black">Columns:</span>
      <span className="flex items-center gap-1.5">
        {[2, 3, 4, 5].map((item, i) => (
          <Button
            key={i}
            className={`w-10 h-8 flex gap-1 justify-center ${
              size === item ? "bg-gray-900 text-white" : "bg-white text-black"
            } text-sm  hover:bg-gray-900 hover:text-white px-2 py-0 rounded-md`}
            onClick={() => globalStore.setColumnSize(item)}
          >
            {Array.from({ length: item }).map((_, i) => (
              <span
                key={i}
                className={`w-[1px] h-4 rounded-full ${
                  size === item ? "bg-white" : "bg-gray-900"
                }`}
              />
            ))}
          </Button>
        ))}
      </span>
    </span>
  )
}
