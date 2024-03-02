import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Routes, imageRoute, sitePath } from "@/pages/sites/ai-image-gen";
import { type EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { BiArea, BiSupport } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight, FaRegEnvelope } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { GrSecure } from "react-icons/gr";
import { IoMdQuote } from "react-icons/io";
import { IoBedOutline } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import { PiBathtubLight } from "react-icons/pi";
import {
  useDotButton,
  useEmblaNavigation,
} from "../../../hooks/useEmblaNavigation";

function Heading3({
  children = <>This is heading 3</>,
  reverseColor = false,
}: {
  children?: React.ReactNode;
  reverseColor?: boolean;
}) {
  return (
    // <h3 className="text-[20px] font-bold text-purple-600 max-sm:text-base">
    <h3
      className={`text-[20px] uppercase ${
        !reverseColor ? "text-white" : `text-black`
      } max-sm:text-base`}
    >
      {children}
    </h3>
  );
}
function Heading2({
  reverseColor = false,
  children = <>This is heading 2</>,
}: {
  reverseColor?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <h2
      className={`text-[44px] font-bold leading-[1.3em] ${!reverseColor ? "text-white" : `text-black`}  max-sm:text-[32px] max-sm:leading-normal`}
    >
      {children}
    </h2>
  );
}
function Text({
  children = <>This is a text</>,
  reverseColor = false,
}: {
  children: React.ReactNode;
  reverseColor?: boolean;
}) {
  return (
    <p
      className={`max-sm:text-[14px] ${reverseColor ? "text-black" : `text-gray-400`} `}
    >
      {children}
    </p>
  );
}
export function PrimaryButton({
  children = <>Primary Button</>,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      className="max-sm:max-w-auto h-[45px] bg-purple-600"
    >
      {children}
    </Button>
  );
}

function Slider1() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      slidesToScroll: 1,
      align: "start",
      loop: true,
    },
    [Autoplay()],
  );

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (autoplay.options.stopOnInteraction === false) {
      autoplay.reset;
    } else {
      autoplay.stop;
    }
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick,
  );

  return (
    <>
      {/* Testimonial slider */}{" "}
      <div className="max-w-full  pt-20 max-md:pt-4">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="ml-[-20px] flex">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="embla__slide w-1/3 pl-[20px] max-md:w-1/2 max-sm:w-full"
                >
                  <div className="flex">
                    <div className=" relative h-[300px] w-[700px] max-md:h-[300px]">
                      <Image
                        src={
                          "/sites/real-estate/demo-real-estate-slider-01.jpg"
                        }
                        fill
                        alt="Picture of the author"
                        className="z-0 object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex gap-4 pt-10">
        <div className="embla__dots flex w-full justify-center gap-4">
          {scrollSnaps.map((_, index) => (
            <Button
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"size-5 rounded-full p-0 hover:bg-purple-600".concat(
                index === selectedIndex ? " bg-purple-600" : " bg-gray-300",
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function WelcomeSection() {
  return (
    <div
      className={`section-box-w  flex-center  relative cursor-pointer  flex-col gap-5  overflow-hidden pt-44 text-center  `}
    >
      <h2 className="gap-0 text-[60px] font-semibold leading-tight text-white max-lg:text-[44px] max-md:text-[32px]">
        Create beautiful art with
        <span
          className="mb-[-20px]  max-sm:mb-0"
          style={{
            backgroundImage:
              "linear-gradient(315deg, #7F00FF 35%, #E100FF 50%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {" "}
          Artificial Intelligence
        </span>
      </h2>

      <div className="flex flex-col items-center justify-center gap-10">
        <h3 className="text-base text-white">
          Be advised that image generation requires an active OpenAI, Stability
          AI or Stable Diffusion token.
        </h3>
        {/* Form */}
        <div className="relative flex w-full max-w-[500px] items-center justify-between gap-4 rounded-lg bg-white p-1  ">
          <Input
            type="text"
            placeholder="Describe what you want or hit a tag below"
            className="rounded-md border-none bg-gray-100 px-4 text-black max-sm:text-[12px]"
          />
          <PrimaryButton>
            <span className="max-md:hidden">Generate</span>
          </PrimaryButton>
        </div>
        {/* Tags */}
        <div className="flex flex-wrap items-center justify-center gap-10">
          <span className="text-white">Popular Tags</span>
          <div className="flex gap-2">
            {["House", "Apartment", "Villa", "Office"].map((tag, i) => (
              <Link href={Routes.shop.path} key={i}>
                <Button
                  size={"sm"}
                  className=" bg-black/30 px-4 text-[10px]  text-white"
                >
                  {tag}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <Text>
          Limits per hour: 80 images for all visitors and up to 2 requests from
          a single visitor.
        </Text>
      </div>

      <div
        className="flex-center mt-10  px-10 py-5 text-xl"
        style={{
          backgroundImage: "linear-gradient(315deg, #7606E7 35%, #C300FF 50%)",
        }}
      >
        Three APIs integrated: OpenAI, Stable Diffusion and Stability AI (100+
        models combined)
      </div>
      <Slider1 />
    </div>
  );
}

function AboutSection2() {
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
            <h2 className="absolute bottom-0 right-0 w-full max-w-[300px] bg-black px-10 py-10 text-3xl font-semibold">
              We develop & create digital future.
            </h2>
          </div>
        </div>
        {/* Text box */}
        <div className="flex flex-col justify-center gap-4  max-md:w-full">
          <Heading3>WHAT WE DO</Heading3>
          <Heading2>Create your own AI business easily</Heading2>

          <p className="max-w-[400px] pb-6 leading-9 max-md:max-w-full max-sm:py-2 max-sm:leading-normal ">
            Adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis.
          </p>

          <div className="max-sm:item-start flex w-full flex-wrap items-center gap-5 self-start   max-md:pt-5   max-sm:justify-start">
            <PrimaryButton>About community</PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
}
function LogosSection() {
  return (
    <>
      <div className="border-y-2">
        <div className="section-box-w flex items-center max-md:max-w-full  max-md:px-0">
          <div className="justify-stretchs  flex w-full items-center divide-x-2 max-md:grid">
            {/* Category box grid */}
            <div className="grid w-full grid-cols-5 flex-wrap   divide-x-2 max-md:border-t-gray-800 max-sm:grid-cols-2">
              {[
                {
                  icon: (
                    <Image
                      loading="lazy"
                      src={sitePath.concat("/logos/agl.png")}
                      alt="Picture of the author"
                      fill
                      objectFit="contain"
                    />
                  ),
                },
                {
                  icon: (
                    <Image
                      loading="lazy"
                      src={sitePath.concat("/logos/agl.png")}
                      alt="Picture of the author"
                      fill
                      objectFit="contain"
                    />
                  ),
                },
                {
                  icon: (
                    <Image
                      loading="lazy"
                      src={sitePath.concat("/logos/agl.png")}
                      alt="Picture of the author"
                      fill
                      objectFit="contain"
                    />
                  ),
                },
                {
                  icon: (
                    <Image
                      loading="lazy"
                      src={sitePath.concat("/logos/agl.png")}
                      alt="Picture of the author"
                      fill
                      objectFit="contain"
                    />
                  ),
                },
                {
                  icon: (
                    <Image
                      loading="lazy"
                      src={sitePath.concat("/logos/agl.png")}
                      alt="Picture of the author"
                      fill
                      objectFit="contain"
                    />
                  ),
                },
              ].map((item, i) => (
                <div
                  className="relative grid h-[180px] w-full place-items-center content-center justify-center gap-2 max-md:h-[130px]  max-sm:border-b-2 last:max-sm:border-b-0"
                  key={i}
                >
                  <div className="relative size-40">{item.icon}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function TestimonialSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      slidesToScroll: 1,
      align: "start",
      loop: true,
    },
    [Autoplay()],
  );

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (autoplay.options.stopOnInteraction === false) {
      autoplay.reset;
    } else {
      autoplay.stop;
    }
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick,
  );
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = useEmblaNavigation(emblaApi);

  return (
    <div className="section-box-w relative flex max-w-[960px] flex-col justify-center">
      {/* Testimonial slider */}{" "}
      <div className="max-w-full max-md:pt-4">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="ml-[-20px] flex">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="embla__slide w-full pl-[20px]">
                  <div className="flex">
                    <div className="flex-center  w-[100vw] flex-col text-center">
                      <IoMdQuote className="rotate-180 text-[60px] text-purple-500" />
                      <p className="text-xl leading-loose">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Perferendis officia nostrum libero veritatis nisi
                        quasi ullam tenetur nobis odio debitis! Deserunt, ipsum
                        provident illo illum tempora at architecto? Voluptas,
                        sint!
                      </p>
                      <div className="flex-center gap-4 pt-10">
                        <div className="relative h-20 w-20 overflow-hidden rounded-full">
                          <Image
                            src={
                              "/sites/real-estate/demo-real-estate-slider-01.jpg"
                            }
                            fill
                            alt="Picture of the author"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="font-bold">Jacob Daniels</div>
                          <div className="opacity-70">CEO, Company</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="absolute flex w-full gap-4 pt-10  text-[40px] text-white">
        <span
          onClick={onPrevButtonClick}
          className="absolute left-[-6em] h-20 w-20 rounded-full bg-transparent   text-white"
        >
          <BsArrowLeft />
        </span>
        <span
          onClick={onNextButtonClick}
          className="absolute  right-[-6em] h-20  w-20  rounded-full bg-transparent    text-white"
        >
          <BsArrowRight />
        </span>
      </div>
    </div>
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
                className="flex flex-wrap  items-start gap-6 max-sm:flex-col"
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
    <div className="ml-10 flex max-sm:ml-4">
      <div className="relative  h-[485px] w-[360px] max-sm:h-[280px] max-sm:w-[200px]">
        <Image
          src={"/sites/real-estate/demo-real-estate-slider-01.jpg"}
          fill
          alt="Picture of the author"
          className="z-0 object-cover"
        />
        <div className="absolute h-full w-full bg-gradient-to-t from-gray-800 mix-blend-overlay" />
        <div className="relative h-full  w-full text-white">
          <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="pb-4 text-2xl font-bold max-sm:pb-2 max-sm:text-base">
              Washington DC, USA
            </div>
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
  } = useEmblaNavigation(emblaApi);

  return (
    <>
      <div className="section-py bg-gray-100">
        <div className="section-box-w relative flex gap-14 max-lg:flex-wrap">
          {/* text box */}
          <div className="grid content-center items-center gap-4">
            <Heading3>Online property marketplace</Heading3>
            <Heading2>
              We are available in{" "}
              <span className="underline-green-300 font-bold text-purple-600 underline">
                many countries
              </span>
            </Heading2>
            <p className="max-w-[400px] pb-10 pt-6 max-md:pb-0">
              Online property marketplace to buy, sell, and rent residential and
              commercial properties. Used by millions of renters to find
              property.
            </p>
            <div className="relative flex gap-4 max-md:hidden">
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
          {/* slider */}
          <div className=" mr-[-20vw] ">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex max-w-[60em]  max-xl:max-w-[44em] max-lg:max-w-[100vw]">
                {" "}
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <LocationSliderItem key={i} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CTASection() {
  return (
    <>
      <div className="min-h-[10em] border-t-2 bg-gray-50 ">
        <div className="section-box-w mt-[-6em] max-md:mt-0 max-md:pt-20 max-sm:pt-10">
          <div className="flex flex-wrap items-center justify-between gap-10 rounded-xl bg-purple-500 px-14 py-14 max-md:flex-wrap max-md:justify-center max-sm:gap-4 max-sm:px-4 max-sm:py-4">
            <div className="flex flex-col  gap-5 max-md:w-full max-md:text-center max-sm:gap-0 ">
              <Heading2 reverseColor>
                Subscribe to{" "}
                <span className="font-bold underline">newsletter</span>
              </Heading2>
              <Text reverseColor>Social media its ways of our excellence.</Text>
            </div>
            <div className="relative flex h-[60px] w-full max-w-[400px] items-center justify-between gap-4  rounded-lg bg-white px-4  ">
              <Input
                type="text"
                placeholder="Enter your email"
                className="rounded-md border-none bg-gray-100 px-4 text-black max-sm:text-[12px]"
              />
              <Button
                variant={"outline"}
                className=" right-2 flex gap-2 bg-white uppercase text-black"
              >
                <FaRegEnvelope className="text-purple-500 max-md:text-xl max-sm:text-base" />
                <span className="max-md:hidden">Subscribe</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AboutSection() {
  return (
    <div className="section-box-w section-py flex flex-col gap-10">
      {/* about text */}
      <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1">
        <div className="flex  flex-col gap-4">
          <Heading3>HUGE COLLECTION</Heading3>
          <Heading2>More algorithms than anywhere else.</Heading2>
        </div>
        <div className="flex flex-col ">
          <Text>
            Adipiscing elit, sed do euismod tempor incidunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco. <br /> <br />
            Adipiscing elit, sed do euismod tempor incidunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam.
          </Text>
        </div>
      </div>
      {/* icon box grid */}
      <div className="grid w-full  grid-cols-4  content-center  gap-8 pt-10 max-xl:grid-cols-2 max-md:gap-y-20 max-md:py-10 max-sm:grid-cols-2   max-sm:py-4 ">
        {[
          {
            title: "Natural Language",
            icon: <GrSecure />,
            bg: "bg-yellow-100",
          },
          {
            title: "Face Recognition",
            icon: <FiTruck />,
            bg: "bg-red-100",
          },
          {
            title: "Computer Vision",
            icon: <LuBox />,
            bg: "bg-orange-100",
          },
          {
            title: "Automated Reasoning",
            icon: <BiSupport />,
            bg: "bg-yellow-100",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex min-h-[150px] flex-col items-start justify-center gap-2  border-r-2 border-gray-700 pl-4 first:p-0 last:border-none max-md:border-none max-md:p-0  "
          >
            <div className={`text-[50px] text-gray-600`}>{item.icon}</div>
            <h3 className="max-w-[100px] pb-6 pt-3 text-xl font-bold max-sm:text-base">
              {item.title}
            </h3>
            <div className="flex-center gap-4">
              Read more
              <FaArrowRight />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export function View() {
  return (
    <main className="bg-gray-900 text-white">
      <WelcomeSection />
      <AboutSection />
      <TestimonialSlider />
      <AboutSection2 />
      <LogosSection />
      <PropertyListSection />
      <WhyUs1Section />
      <LocationsSection />
      <CTASection />
    </main>
  );
}
