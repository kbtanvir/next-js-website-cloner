import { IoCarSportOutline } from "react-icons/io5";
import { PiBathtubLight } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { IoBedOutline } from "react-icons/io5";
import { Routes } from "../../../pages/sites/real-estate";

function SliderItem({
  item,
}: {
  item: {
    title: string;
    discount: string;
    bg: string;
  };
}) {
  return (
    <CarouselItem className="relative h-[91.5vh]">
      <Image
        src={"/sites/real-estate/demo-real-estate-slider-01.jpg"}
        fill
        alt="Picture of the author"
        className="z-0 object-cover"
      />
      <div
        className={`${item.bg}  section-box-w  grid cursor-pointer items-start gap-5 overflow-hidden`}
      >
        <div className="absolute z-10 flex h-full w-full flex-col justify-center gap-4 bg-opacity-50 ">
          <h3 className="text-base   text-white max-md:text-xl">
            Some location in the city
          </h3>
          <h5 className="grid gap-0 text-[60px] text-white max-md:text-base">
            <span className="mb-[-20px] font-light">Luxurious</span>
            <span className="font-bold">Mension</span>
          </h5>
          <div className="flex gap-4">
            <Link href={Routes.shop.path}>
              <Button className="mt-2 bg-white text-[10px] uppercase text-black">
                Schedule Visit
              </Button>
            </Link>
            <Link href={Routes.shop.path}>
              <Button
                className="mt-2 bg-transparent  text-[10px] uppercase text-white"
                variant="outline"
              >
                View details
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 z-10 flex place-items-center gap-10 rounded-tl-lg bg-white px-10 py-10">
          <div className="flex  divide-x ">
            {/* convinience */}
            {[
              {
                icon: <IoBedOutline />,
                title: "3 Beds",
                price: "1000",
              },
              {
                icon: <PiBathtubLight />,
                title: "3 Baths",
                price: "1000",
              },
              {
                icon: <IoCarSportOutline />,
                title: "3 Parking",
                price: "1000",
              },
            ].map((conv, index) => (
              <div
                key={index}
                className="grid place-items-center items-center gap-2 px-5  text-black first:pl-0 last:pr-0"
              >
                <div className="text-[40px]">{conv.icon}</div>
                <div className="text-[14px]">{conv.title}</div>
              </div>
            ))}
          </div>
          <div className="grid place-items-center gap-2">
            For sell price
            <div className="text-3xl font-bold">$100000</div>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
function WelcomeSection() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <Carousel
      // plugins={[plugin.current]}
      // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      // onMouseEnter={plugin.current.start}
      // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      // onMouseLeave={plugin.current.stop}
      className=" w-full "
    >
      <CarouselContent>
        {[
          {
            title: "Fresh & Healthy Backery",
            discount: "35%",
            bg: "bg-red-100",
          },
        ].map((item, index) => (
          <SliderItem key={index} item={item} />
        ))}
      </CarouselContent>
    </Carousel>
  );
}
function AboutSection() {
  return (
    <>
      <div className="section-box-w section-py flex gap-24">
        <div className="w-1/2">
          <Image
            src={"/sites/real-estate/demo-real-estate-slider-01.jpg"}
            width={500}
            height={500}
            layout="responsive"
            alt="Picture of the author"
            className="z-0 object-cover"
          />
        </div>
        <div className="w-1/2">
          <h2>Why Choose Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <div>
            <div>
              <h3>01</h3>
              <h4>Quality Services</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </div>
            <div>
              <h3>02</h3>
              <h4>Quality Services</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </div>
            <div>
              <h3>03</h3>
              <h4>Quality Services</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export function View() {
  return (
    <main>
      <WelcomeSection />
      <AboutSection />
      <>properties</>
      <>why us 1</>
      <>Locations</>
      <>why us 2</>
      <>footer</>
    </main>
  );
}
