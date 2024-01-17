import { Button } from "../ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { globalStore } from "~/utils/global.store"

function AvaibilityFilter() {
  return (
    <div className="flex flex-col justify-between gap-5">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            onCheckedChange={() => {
              globalStore.setProductsQueryDTO((s) => ({
                ...s,
                inStock: !s.inStock,
              }))
            }}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            In Stock
          </label>
        </div>
        0
      </div>
    </div>
  )
}

function SizesFilter() {
  return (
    <div className="flex flex-col justify-between gap-5">
      {ProductSizes.map((item, i) => (
        <div key={i} className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              onCheckedChange={() => {
                // globalStore.setProductsQueryDTO((s) =>
                //   s.sizes?.includes(ProductSizes[i] as string)
                //     ? {
                //         ...s,
                //         sizes: [
                //           ...s.sizes.filter(
                //             (s) => s.toString() !== ProductSizes[i]
                //           ),
                //         ],
                //       }
                //     : {
                //         ...s,
                //         sizes: [...s.sizes, ProductSizes[i]],
                //       }
                // )
              }}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item}
            </label>
          </div>
          0
        </div>
      ))}
    </div>
  )
}
const ProductSizes = ["S", "L", "XL"] as const

export const ProductsQueryInput = z.object({
  category: z.string().optional(),
  limit: z.number().min(10).optional(),
  cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
  inStock: z.boolean().optional(),
  price: z
    .object({
      gte: z.coerce.number().min(0).optional(),
      lte: z.coerce.number().min(10).optional(),
    })
    .optional(),
})

export type IProductQueryInput = z.infer<typeof ProductsQueryInput>

export function Sidebar() {
  const form = useForm<IProductQueryInput>({
    resolver: zodResolver(ProductsQueryInput),
  })
  function onSubmit(data: IProductQueryInput) {
    globalStore.setProductsQueryDTO((state) => ({ ...state, ...data }))
  }
  return (
    <div className="max-w-[280px] w-full">
      <span className=" flex grow flex-col items-stretch">
        <div className="text-[22px] leading-6 text-zinc-800 text-opacity-80">
          Filter:
        </div>
        <div className="mt-7 flex h-px shrink-0 flex-col bg-zinc-800 bg-opacity-20" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <Accordion
              type="multiple"
              className="w-full"
              defaultValue={["item-1", "item-2", "item-3"]}
            >
              <AccordionItem data-state={"open"} value="item-1">
                <AccordionTrigger>Avaibility</AccordionTrigger>
                <AccordionContent>
                  <AvaibilityFilter />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem data-state={"open"} value="item-2">
                <AccordionTrigger>Price</AccordionTrigger>
                <AccordionContent className="">
                  <div className="flex gap-5 mb-5">
                    <Input
                      min={0}
                      type={"number"}
                      placeholder="Min "
                      onChange={(e) => {
                        form.setValue("price.gte", parseFloat(e.target.value))
                      }}
                      value={form.watch("price.gte") ?? ""}
                    />
                    <Input
                      min={10}
                      type={"number"}
                      placeholder="Max "
                      onChange={(e) => {
                        form.setValue("price.lte", parseFloat(e.target.value))
                      }}
                      value={form.watch("price.lte") ?? ""}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Submit</Button>
                    <Button
                      onClick={() => {
                        form.reset({ price: undefined })
                        globalStore.setProductsQueryDTO((s) => ({
                          ...s,
                          price: undefined,
                        }))
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Sizes</AccordionTrigger>
                <AccordionContent>
                  <SizesFilter />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </form>
        </Form>
      </span>
    </div>
  )
}
