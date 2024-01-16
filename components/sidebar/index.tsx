import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { globalStore } from "~/utils/global.store";


function AvaibilityFilter() {
  return (
    <div className="flex flex-col justify-between gap-5">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            onChange={(e) => {
              console.log(e.target)
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

export function Sidebar() {
  // * FORM FIELDS
 const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
 
  function onSubmit(data: z.infer<typeof FormSchema>) {
    globalStore.setState(dto)
  }
   
  return (
    <div className="max-w-[220px] w-full">
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
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Avaibility</AccordionTrigger>
                <AccordionContent>
                  <AvaibilityFilter />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Price</AccordionTrigger>
                <AccordionContent>
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