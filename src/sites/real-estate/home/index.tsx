import { FaArrowRight, FaCheck } from "react-icons/fa";
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
          <h3 className="text-base text-white max-md:text-xl">
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
          <div className="relative h-[600px] max-w-[500px]">
            <Image
              src={"/sites/real-estate/demo-real-estate-slider-01.jpg"}
              layout="fill"
              alt="Picture of the author"
              className="z-0 object-cover"
            />
          </div>
        </div>
        <div className="grid w-1/2 content-center items-center gap-4">
          <h3 className="text-[20px] font-bold text-purple-600">
            Online property marketplace
          </h3>
          <h2 className="text-[60px] font-light leading-[1.1em] text-black max-md:text-base">
            We help you find your{" "}
            <span className="underline-green-300 font-bold text-purple-600 underline">
              new place.
            </span>
          </h2>
          <p className="max-w-[400px] py-6 leading-9">
            Online property marketplace to buy, sell, and rent residential and
            commercial properties. Used by millions of renters to find property.
          </p>

          <div className="grid">
            {[
              {
                text: "10,000+ people trusting our agency.",
              },
              {
                text: "10,000+ people trusting our agency.",
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
          <div className="pt-10">
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
function CategorySection() {
  return (
    <>
      <div className="border-y-2">
        <div className="section-box-w flex items-center ">
          <div className="justify-stretchs grid-cols- flex w-full items-center divide-x-2">
            {/* Text box */}
            <div className="w-full max-w-[200px] pr-10 text-xl font-bold">
              What are you{" "}
              <span className="underline-green-300 font-bold text-purple-600 underline">
                looking
              </span>{" "}
              for?
            </div>
            {/* Category box grid */}
            <div className="grid w-full grid-cols-5 divide-x-2">
              {[
                {
                  icon: <IoBedOutline />,
                  title: "House",
                  count: 100,
                },
                {
                  icon: <IoBedOutline />,
                  title: "House",
                  count: 100,
                },
                {
                  icon: <IoBedOutline />,
                  title: "House",
                  count: 100,
                },
                {
                  icon: <IoBedOutline />,
                  title: "House",
                  count: 100,
                },
                {
                  icon: <IoBedOutline />,
                  title: "House",
                  count: 100,
                },
              ].map((item, i) => (
                <div
                  className="relative grid h-[180px] w-full place-items-center content-center justify-center gap-2"
                  key={i}
                >
                  <div className="text-[40px] font-bold">{item.icon}</div>
                  <div className="font-bold">{item.title}</div>
                  <div className="flex-center absolute left-4 top-4 rounded-md bg-green-100 px-3 py-1 text-sm text-green-500">
                    {item.count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PropertyListCard() {
  return (
    <div className="relative w-full cursor-pointer flex-col overflow-hidden rounded-lg border border-solid border-gray-100 shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-lg max-md:ml-0 max-md:w-full">
      {/* THUMBNAIL BOX */}
      <div className="relative flex  w-full  flex-col rounded-lg">
        {/* THUMBNAIL */}
        <div className="relative h-[260px]">
          <Image
            loading="lazy"
            src={"/sites/real-estate/demo-real-estate-slider-01.jpg"}
            alt="Picture of the author"
            fill
          />
        </div>
        {/* TAGS */}
        <div className="absolute flex w-full flex-col items-start">
          <div className="flex items-stretch pl-6 pt-6">
            <span className="justify-self-start whitespace-nowrap rounded-md border border-solid border-white border-opacity-10 bg-red-600 px-3.5 py-1.5 text-center text-xs leading-3 text-white">
              Rent
            </span>
          </div>
        </div>
      </div>

      <div className="px-10 py-6">
        <h3 className="text-lg font-bold">Luxury villa in Texas</h3>
      </div>
    </div>
  );
}

function PropertyListSection() {
  return (
    <>
      <div className="section-py bg-gray-50">
        <div className="section-box-w">
          {/* SECTION TITLE 
          -----------------*/}
          <div className="flex justify-between pb-14">
            <div className="">
              <h2 className="text-[44px] font-light leading-[1.1em] text-black max-md:text-base">
                Property for{" "}
                <span className="underline-green-300 font-bold text-purple-600 underline">
                  sell and rent
                </span>
              </h2>
            </div>
            <div className="flex-center gap-2">
              <Button variant="link" className="flex-center gap-2 text-lg">
                View all properties{" "}
                <div className="flex-center ml-2 h-10 w-10 rounded-full bg-black text-[20px] text-white">
                  <FaArrowRight />
                </div>
              </Button>
            </div>
          </div>
          {/* Propertiy List
          -----------------*/}
          <div className="autofit-grid-250 grid w-full grid-cols-3  gap-5 ">
            <PropertyListCard />
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
      <CategorySection />
      <PropertyListSection />
      <>why us 1</>
      <>Locations</>
      <>why us 2</>
      <>footer</>
    </main>
  );
}
