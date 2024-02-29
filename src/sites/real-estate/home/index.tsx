import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { BiArea } from "react-icons/bi";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaRegEnvelope,
  FaStar,
} from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { PiBathtubLight } from "react-icons/pi";
import { usePrevNextButtons } from "./CarouselNavigation";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { IoBedOutline } from "react-icons/io5";
import { Routes, imageRoute } from "../../../pages/sites/real-estate";
import { EmblaCarouselItem } from "./EmblaCarousel";

function WelcomeSliderItem({
  item,
}: {
  item: {
    title: string;
    discount: string;
    bg: string;
  };
}) {
  return (
    <CarouselItem className="relative h-[100vh] max-md:h-[75vh]">
      <Image
        src={`${imageRoute}/demo-real-estate-slider-01.jpg`}
        fill
        alt="Picture of the author"
        className="z-0 object-cover"
      />
      <div
        className={`${item.bg} section-box-w  grid cursor-pointer items-start gap-5 overflow-hidden max-md:gap-0`}
      >
        <div className="absolute z-10 flex h-full w-full flex-col justify-center gap-4 bg-opacity-50 max-sm:pb-[20vh]">
          <h3 className="text-base text-white">Some location in the city</h3>
          <h2 className="grid gap-0 text-[60px] text-white max-sm:text-[44px]">
            <span className="mb-[-20px] font-light max-sm:mb-0">Luxurious</span>
            <span className="font-bold">Mension</span>
          </h2>
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
        <div className="absolute bottom-0 right-0 z-10 flex flex-wrap place-items-center gap-10 rounded-tl-lg bg-white px-10 py-10 max-sm:justify-between   max-sm:gap-6  max-sm:bg-white/65 max-sm:px-10 max-sm:py-6">
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
          <div className="grid place-items-center gap-2 max-sm:place-items-start">
            For sell price
            <div className="text-3xl font-bold max-sm:text-xl">$100000</div>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
function WelcomeSection() {
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
          <WelcomeSliderItem key={index} item={item} />
        ))}
      </CarouselContent>
    </Carousel>
  );
}
function Heading3({
  children = <>This is heading 3</>,
}: {
  children: React.ReactNode;
}) {
  return (
    <h3 className="text-[20px] font-bold text-purple-600 max-sm:text-base">
      {children}
    </h3>
  );
}
function Heading2({
  children = <>This is heading 2</>,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-[44px] font-light leading-[1.3em] text-black  max-sm:text-[32px] max-sm:leading-normal">
      {children}
    </h2>
  );
}
function Text({
  children = <>This is a text</>,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-[44px] font-light leading-[1.1em] text-black max-md:max-w-[400px] max-sm:text-[32px]">
      {children}
    </h2>
  );
}
function PrimaryButton({
  children = <>Primary Button</>,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      className="max-sm:max-w-auto h-[50px] bg-purple-600"
    >
      {children}
    </Button>
  );
}
function AboutSection() {
  return (
    <>
      <div className="section-box-w section-py flex gap-24 max-xl:gap-10   max-md:flex-col max-md:gap-10 ">
        {/* Image */}
        <div className="w-full max-w-[450px] max-md:max-w-full">
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
        <div className="flex flex-col justify-center gap-4  max-md:w-full">
          <Heading3>Online property marketplace</Heading3>
          <Heading2>
            We help you find your{" "}
            <span className="underline-green-300 font-bold text-purple-600 underline">
              new place.
            </span>
          </Heading2>

          <p className="max-w-[400px] py-6 leading-9 max-md:max-w-full max-sm:py-2 max-sm:leading-normal ">
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
                <div className="flex-center h-10  w-10 rounded-full bg-green-100 text-green-500 max-sm:size-5 max-sm:text-[12px]">
                  <FaCheck />
                </div>
                <div className="font-bold max-sm:text-[14px]">{item.text}</div>
              </div>
            ))}
          </div>
          <div className="max-sm:item-start flex w-full flex-wrap items-center gap-5 self-start pt-10 max-md:pt-5   max-sm:justify-start">
            <PrimaryButton>About community</PrimaryButton>
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
        <div className="section-box-w flex items-center max-md:max-w-full  max-md:px-0">
          <div className="justify-stretchs  flex w-full items-center divide-x-2 max-md:grid">
            {/* Text box */}
            <div className="max-md:section-px  w-full max-w-[200px] pr-10 text-xl font-bold max-md:max-w-full max-md:border-b-2 max-md:py-10">
              What are you{" "}
              <span className="underline-green-300 font-bold text-purple-600 underline">
                looking
              </span>{" "}
              for?
            </div>
            {/* Category box grid */}
            <div className="grid w-full grid-cols-5 flex-wrap   divide-x-2 max-md:border-t-gray-800 max-sm:grid-cols-2">
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
                  className="relative grid h-[180px] w-full place-items-center content-center justify-center gap-2 max-md:h-[130px]  max-sm:border-b-2 last:max-sm:border-b-0"
                  key={i}
                >
                  <div className="text-[40px] font-bold max-md:text-[30px]">
                    {item.icon}
                  </div>
                  <div className="font-semibold max-md:text-[14px]">
                    {item.title}
                  </div>
                  <div className="flex-center absolute left-4 top-4 rounded-md bg-purple-100 px-2 py-1 text-[12px] font-bold text-purple-500">
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
    <div className="relative w-full cursor-pointer flex-col overflow-hidden rounded-lg border border-solid border-gray-100 bg-white shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg max-md:ml-0 max-md:w-full ">
      {/* THUMBNAIL BOX */}
      <div className="relative flex w-full flex-col rounded-lg">
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
      {/* DETAILS BOX */}
      <div className="flex flex-col gap-6 px-10 py-6 max-md:px-6  ">
        {/* Title */}
        <div className="">
          <h3 className="text-lg font-bold">Luxury villa in Texas</h3>
          <p className="text-base opacity-80 ">982 Monroe ave, rochester</p>
        </div>
        {/* convinience */}
        <div className="flex flex-wrap justify-between gap-2">
          {[
            {
              icon: <IoBedOutline />,
              title: "Beds",
              amount: "04",
            },
            {
              icon: <PiBathtubLight />,
              title: "Baths",
              amount: "05",
            },
            {
              icon: <BiArea />,
              title: "Area",
              amount: "780m2",
            },
          ].map((conv, index) => (
            <div
              key={index}
              className="flex flex-col flex-wrap gap-2 text-black first:pl-0 last:pr-0"
            >
              <div className="text-[24px]">{conv.icon}</div>
              <div className="text-base font-bold">{conv.amount}</div>
              <div className="text-[14px]">{conv.title}</div>
            </div>
          ))}
        </div>
      </div>
      {/* buttons and price */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 px-10 py-6 max-md:px-6">
        <p className="text-[20px] font-bold opacity-80">$600,000</p>
        <Button className="uppercase">View details</Button>
      </div>
    </div>
  );
}

function PropertyListSection() {
  return (
    <>
      <div className="section-py bg-gray-100">
        <div className="section-box-w">
          {/* SECTION TITLE 
          -----------------*/}
          <div className="flex w-full place-items-center content-center items-center justify-between gap-10 pb-20 max-md:grid max-md:justify-center max-sm:place-items-start max-sm:gap-6">
            <div className="">
              <Heading2>
                Property for{" "}
                <span className="underline-green-300 font-bold text-purple-600 underline">
                  sell and rent
                </span>
              </Heading2>
            </div>
            <Button
              variant="link"
              className="flex-center m-0 gap-2 p-0 text-lg"
            >
              View all properties{" "}
              <div className="flex-center ml-2 h-10 w-10 rounded-full bg-black text-[20px] text-white">
                <FaArrowRight />
              </div>
            </Button>
          </div>

          {/* Propertiy List
          -----------------*/}
          <div className="autofit-grid-250 grid w-full  gap-6 ">
            <PropertyListCard />
            <PropertyListCard />
            <PropertyListCard />
            <PropertyListCard />
            <PropertyListCard />
            <PropertyListCard />
          </div>
        </div>
      </div>
    </>
  );
}
function WhyUs1Section() {
  return (
    <>
      <div className="section-box-w section-py flex flex-row-reverse gap-24 max-xl:gap-10 max-md:flex-col max-md:gap-10">
        {/* Image */}
        <div className="w-full max-w-[500px] max-md:max-w-full">
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
        <div className="flex w-full  flex-col  gap-4">
          <Heading3>Online property marketplace</Heading3>
          <Heading2>
            Accurate to 99% of a{" "}
            <span className="underline-green-300 font-bold text-purple-600 underline">
              property`s
            </span>{" "}
            details.
          </Heading2>

          <div className="flex w-full  flex-col gap-10 pt-14  ">
            {[
              {
                text: "10,000+ people trusting our agency.",
                desc: "Browse millions of properties in your city save your favorites.",
                icon: (
                  <Image
                    src={`${imageRoute}/loan.png`}
                    alt=""
                    fill
                    objectFit="cover"
                  />
                ),
              },
              {
                text: "Highest rental income projects",
                desc: "Browse millions of properties in your city save your favorites.",
                icon: (
                  <Image
                    src={`${imageRoute}/satisfaction.png`}
                    alt=""
                    fill
                    objectFit="cover"
                  />
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-wrap  items-start gap-4 max-sm:flex-col"
              >
                <div className="relative h-[80px] w-[80px] max-w-[80px]   overflow-hidden rounded-[100%] bg-green-100   text-green-500">
                  {item.icon}
                </div>
                <div className="flex flex-1 flex-col gap-4">
                  <div className="font-bold">{item.text}</div>
                  <div className="opacity-70">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 pt-10">
            <Button>Learn more</Button>{" "}
            <Button
              variant={"outline"}
              className="flex-center gap-2 border-2 border-black"
            >
              Trusted agents <FaArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function LocationSliderItem() {
  return (
    <div className="relative h-[485px] bg-blue-300 ">
      <Image
        src={"/sites/real-estate/demo-real-estate-slider-01.jpg"}
        fill
        alt="Picture of the author"
        className="z-0 object-cover"
      />
      <div className="absolute h-full w-full bg-gradient-to-t from-gray-600 mix-blend-overlay" />
      <div className="relative h-[485px] w-[250px] text-white">
        <div className="absolute bottom-10 left-10 w-full">
          <div className="pb-4 text-2xl font-bold">Washington DC, USA</div>
          <div className="">20 property listing</div>
        </div>
        <div className="absolute flex w-full flex-col items-start">
          <div className="flex items-stretch pl-6 pt-6">
            <span className="justify-self-start whitespace-nowrap rounded-md border border-solid border-white border-opacity-10 bg-red-600 px-3.5 py-1.5 text-center text-xs leading-3 text-white">
              Rent
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LocationsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      slidesToScroll: 1,
      align: "start",
      loop: true,
    },
    [Autoplay()],
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <>
      <div className="section-py   overflow-hidden bg-gray-100">
        <div className="section-box-w relative flex  gap-14">
          <div className="grid content-center items-center gap-4">
            <h3 className="text-[20px] font-bold text-purple-600">
              Online property marketplace
            </h3>
            <h2 className="max-w-[480px]  text-[44px] font-light leading-[1.1em] text-black max-md:text-base">
              We are available in{" "}
              <span className="underline-green-300 font-bold text-purple-600 underline">
                many countries
              </span>
            </h2>
            <p className="max-w-[400px] pb-10 pt-6">
              Online property marketplace to buy, sell, and rent residential and
              commercial properties. Used by millions of renters to find
              property.
            </p>
            <div className="relative flex gap-4 ">
              <Button
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                className="h-20 w-20 rounded-full   bg-white text-[20px]  text-gray-600"
              >
                <FaArrowLeft />
              </Button>
              <Button
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                className="h-20 w-20  rounded-full     bg-white text-[20px]  text-gray-600"
              >
                <FaArrowRight />
              </Button>
            </div>
          </div>

          <div className="  mr-[-20vw]">
            <div className="">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {" "}
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <EmblaCarouselItem key={i} slides={3}>
                        <LocationSliderItem />
                      </EmblaCarouselItem>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function WhyUs2Section() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      slidesToScroll: 1,
      align: "start",
      loop: true,
    },
    [Autoplay()],
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <>
      <div className="section-box-w">
        <div className="section-py flex flex-row-reverse gap-24 pb-0">
          {/* text box */}
          <div className="grid w-1/2 content-center items-center gap-4">
            <h3 className="text-[20px] font-bold text-purple-600">
              Clients feedback
            </h3>
            <h2 className="max-w-[480px] text-[44px] font-light leading-[1.1em] text-black max-md:text-base">
              Here is what our{" "}
              <span className="underline-green-300 font-bold text-purple-600 underline">
                clients
              </span>{" "}
              have to say
            </h2>

            {/* Testimonial slider */}
            <div className="grid   max-w-[400px]   pt-6">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {[
                    {
                      text: "Alec Thompson",
                      desc: "I just bought a house with the help of this company. Thank you for your support and help with finding me a home. I am very happy with the service and the help, everything was perfect. Thank you very much.",
                      icon: (
                        <Image
                          src={`${imageRoute}/loan.png`}
                          alt=""
                          height={80}
                          width={80}
                          layout="responsive"
                        />
                      ),
                      rating: 5,
                    },
                    {
                      text: "Alec Thompson",
                      desc: "I just bought a house with the help of this company. Thank you for your support and help with finding me a home. I am very happy with the service and the help, everything was perfect. Thank you very much.",
                      icon: (
                        <Image
                          src={`${imageRoute}/loan.png`}
                          alt=""
                          height={80}
                          width={80}
                          layout="responsive"
                        />
                      ),
                      rating: 5,
                    },
                  ].map((item, i) => (
                    <EmblaCarouselItem key={i} slides={1}>
                      <div className="grid  gap-10">
                        <div className="opacity-70">{item.desc}</div>
                        <div className=" flex items-center justify-start gap-10">
                          <div className="relative h-[80px]  w-[80px]  rounded-full bg-green-100   text-green-500">
                            {item.icon}
                          </div>
                          <div className="grid  gap-4">
                            <div className="font-bold">{item.text}</div>
                            <div className="flex">
                              {Array(item.rating)
                                .fill(0)
                                .map((_, i) => (
                                  <div key={i} className="text-yellow-500">
                                    <FaStar />
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </EmblaCarouselItem>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative flex gap-4 pt-10">
              <Button
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                variant={"outline"}
                className="h-20 w-20 rounded-full    text-[20px]  "
              >
                <FaArrowLeft />
              </Button>
              <Button
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                variant={"outline"}
                className="h-20 w-20  rounded-full      text-[20px]  "
              >
                <FaArrowRight />
              </Button>
            </div>
          </div>
          {/* image box */}
          <div className="w-1/2">
            <div className="relative h-[600px]">
              <Image
                src={"/sites/real-estate/demo-real-estate-slider-01.jpg"}
                layout="fill"
                alt="Picture of the author"
                className="z-0 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function CTASection() {
  return (
    <div className="section-box-w mt-32 pb-0">
      <div className="flex   items-center justify-between rounded-xl bg-purple-500 px-14 py-14">
        <div className="grid place-items-start gap-5 ">
          <h2 className="text-[44px]  leading-10 text-white max-md:text-base">
            Subscribe to <span className="font-bold underline">newsletter</span>
          </h2>
          <h3 className="text-base text-white max-md:text-xl">
            Social media its ways of our excellence.
          </h3>
        </div>
        <div className="flex h-[60px] w-full max-w-[400px] items-center justify-between gap-4 rounded-lg bg-white px-4">
          <Input
            type="text"
            placeholder="Enter your email"
            className="h-14 w-96 rounded-md border-none bg-white px-4 text-black"
          />
          <Button className="flex gap-2 bg-white   uppercase text-black">
            <FaRegEnvelope className="text-purple-500" />
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}
export function View() {
  return (
    <main>
      <WelcomeSection />
      <AboutSection />
      <CategorySection />
      <PropertyListSection />
      <WhyUs1Section />
      <LocationsSection />
      <WhyUs2Section />
      <CTASection />
    </main>
  );
}
