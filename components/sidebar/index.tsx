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
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { globalStore, useGlobalStore } from "~/utils/global.store"

function AvaibilityFilter() {
  const { inStock } = useGlobalStore()
  return (
    <div className="flex flex-col justify-between gap-5">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            onCheckedChange={(e) => {
              globalStore.setInStock(!inStock)
              console.log(inStock)
            }}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            In Stock
          </label>
        </div>
      </div>
    </div>
  )
}

function PriceFilter() {
  return (
    <>
      <div className="mt-6 flex h-0.5 shrink-0 flex-col border border-solid border-zinc-800" />
      <span className="mt-6 flex items-start justify-between gap-2.5">
        <div className="text-base leading-5 text-zinc-800">Price:</div>
        <div className="text-base leading-7 text-zinc-800 text-opacity-80">
          $ 0 - $500
        </div>
      </span>
    </>
  )
}

function CategoryFilter() {
  return (
    <div className="flex flex-col justify-between gap-5">
      {["Men", "Women", "Kids"].map((item, i) => (
        <div key={i} className="flex justify-between">
          {item} <span>0</span>
        </div>
      ))}
    </div>
  )
}
export const SidebarFormSchema = z.object({
  inStock: z.boolean().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(10).optional(),
  category: z.string().optional(),
})

export type ISidebarFormSchema = z.infer<typeof SidebarFormSchema>

export function Sidebar() {
  const { toast } = useToast()
  const form = useForm<ISidebarFormSchema>({
    resolver: zodResolver(SidebarFormSchema),
  })
  function onSubmit(data: ISidebarFormSchema) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
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
                      onChange={(e) => {
                        form.setValue("minPrice", parseFloat(e.target.value))
                      }}
                    />
                    <Input
                      min={10}
                      type={"number"}
                      onChange={(e) => {
                        form.setValue("maxPrice", parseFloat(e.target.value))
                      }}
                    />
                  </div>
                  <Button type="submit">Submit</Button>
                  <PriceFilter />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Categories</AccordionTrigger>
                <AccordionContent>
                  <CategoryFilter />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </form>
        </Form>
      </span>
    </div>
  )
}
