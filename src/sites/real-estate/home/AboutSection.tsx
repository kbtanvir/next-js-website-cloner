import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaArrowRight, FaCheck } from "react-icons/fa";

export function AboutSection() {
  return (
    <>
      <div className="section-box-w section-py flex gap-24 max-xl:gap-10 max-md:flex-row-reverse max-md:gap-10 max-sm:flex-col">
        {/* Image */}
        <div className="w-full max-w-[600px] max-md:max-w-[300px] max-sm:max-w-full">
          <div className=" relative h-[600px] max-md:h-[300px]">
            <Image
              src={"/sites/real-estate/demo-real-estate-slider-01.jpg"}
              fill
              alt="Picture of the author"
              className="z-0 object-cover"
            />
          </div>
        </div>
        {/* Text box */}
        <div className="grid content-center items-center gap-4">
          <h3 className="text-[20px] font-bold text-purple-600 max-sm:text-base">
            Online property marketplace
          </h3>
          <h2 className="text-[44px] font-light leading-[1.1em] text-black max-md:max-w-[400px] max-sm:text-[32px]">
            We help you find your{" "}
            <span className="underline-green-300 font-bold text-purple-600 underline">
              new place.
            </span>
          </h2>
          <p className="max-w-[400px] py-6 leading-9 max-sm:py-2 ">
            Online property marketplace to buy, sell, and rent residential and
            commercial properties. Used by millions of renters to find property.
          </p>

          <div className="grid gap-4">
            {[
              {
                text: "10,000+ people trusting our agency.",
              },
              {
                text: "Highest rental income projects",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-center h-10  w-10 rounded-full bg-green-100 text-green-500">
                  <FaCheck />
                </div>
                <div className="font-bold">{item.text}</div>
              </div>
            ))}
          </div>
          <div className="pt-10 max-md:pt-5">
            <Button>About community</Button>{" "}
            <Button variant={"link"} className="flex-center gap-2">
              Our services <FaArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
