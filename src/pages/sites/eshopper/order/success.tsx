import { Button } from "@/components/ui/button";
import { Routes } from "@/pages/sites/eshopper";
import Link from "next/link";

export default function OrderCompletePage() {
  return (
    <div className="mx-auto w-full max-w-[800px] px-10">
      <div className="mt-20 max-md:mt-10">
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
          <Link href={Routes.home.path}>
            <Button className="">Explore Shop</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
