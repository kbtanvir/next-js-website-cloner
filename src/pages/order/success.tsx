import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OrderCompletePage() {
  return (
    <div className="max-w-[800px] w-full mx-auto ">
      <div className="mt-20">
        <div className="text-2xl font-semibold   leading-8 text-zinc-800">
          Thank you!! Your order has been received.
        </div>
        <div className="mt-5">
          <div className="text-sm leading-5 text-zinc-600">
            Thank you for your order. We will contact you soon.
          </div>
        </div>
        {/* expolore shop  button */}
        <div className="mt-10">
          <Link href="/">
            <Button className="">Explore Shop</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
