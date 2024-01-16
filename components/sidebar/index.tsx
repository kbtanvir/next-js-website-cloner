import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function AvaibilityFilter() {
  return (
    <div className="flex flex-col justify-between gap-5">
      {["In Stock", "Not in stock"].map((item, i) => (
        <div key={i} className="flex justify-between">
          {item} <span>0</span>
        </div>
      ))}
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
  return (
    <div className="max-w-[220px] w-full">
      <span className=" flex grow flex-col items-stretch">
        <div className="text-[22px] leading-6 text-zinc-800 text-opacity-80">
          Filter:
        </div>
        <div className="mt-7 flex h-px shrink-0 flex-col bg-zinc-800 bg-opacity-20" />
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
      </span>
    </div>
  )
}
