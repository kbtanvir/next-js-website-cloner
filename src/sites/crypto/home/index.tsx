import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { sitePath } from "@/pages/sites/ai-image-gen";
import Image from "next/image";

import { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { CiFaceMeh } from "react-icons/ci";
import { FaArrowRight, FaRegEnvelope } from "react-icons/fa";
import { GoGitCompare } from "react-icons/go";
import { IoIosGitNetwork, IoMdQuote } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { MdSensorOccupied } from "react-icons/md";
import { useEmbla } from "../../../hooks/useEmbla";
import { Slider } from "../components/slider";
import { Text } from "../components/text";
import { Heading2, Heading3, PrimaryButton, colors } from "../theme";

function CountDown({
  targetDate = new Date(new Date().setHours(new Date().getHours() + 1)),
}: {
  targetDate?: Date;
}) {
  const [time, setTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTime({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full justify-center gap-8 pt-10">
      {[
        {
          text: "Days",
          time: time.days,
          color: colors.hover,
        },
        {
          text: "Hours",
          time: time.hours,
          color: colors.orange,
        },
        {
          text: "Minutes",
          time: time.minutes,
          color: colors.red,
        },
        {
          text: "Seconds",
          time: time.seconds,
          color: colors.green,
        },
      ].map((item, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-1 rounded-lg bg-gray-800/50 px-10 py-4"
        >
          <Text
            className={cn(`text-[35px] font-bold max-sm:text-[24px]`)}
            style={{
              color: item.color,
            }}
          >
            {item.time}
          </Text>
          <Text className="text-[14px] text-gray-200">{item.text}</Text>
        </div>
      ))}
    </div>
  );
}

function WelcomeSection() {
  return (
    <div id="home">
      <div
        className={`section-box-w  flex-center  relative flex  cursor-pointer flex-col  gap-20 pt-44 text-center `}
      >
        {/* TITLE */}
        <h2 className="gap-0 text-[60px] font-semibold leading-tight text-white max-lg:text-[44px] max-md:text-[32px]">
          Join Future Of Algorithmic
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
            Crypto
          </span>{" "}
          Trading Strategies
        </h2>
        {/* RANGE SLIDER */}
        <div className="flex-center w-full max-w-[600px] flex-col">
          <div className="flex w-full justify-between">
            {[
              {
                text: "Pre sell",
                color: colors.hover,
              },
              {
                text: "Soft cap",
                color: colors.orange,
              },
              {
                text: "Bonus",
                color: colors.green,
              },
            ].map((item, i) => (
              <div key={i} className="relative uppercase ">
                <Text
                  className="text-[13px] font-bold"
                  style={{
                    color: item.color,
                  }}
                >
                  {item.text}
                </Text>
                <div
                  className="absolute top-6 h-4   w-[1px]"
                  style={{
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: item.color,
                  }}
                ></div>
              </div>
            ))}
          </div>
          <Slider
            className="w-full  max-md:max-w-full max-sm:w-full max-sm:max-w-full"
            defaultValue={[77]}
            max={100}
            step={1}
          />
          <div className="flex w-full justify-between ">
            <Text className="font-bold text-white">65% TARGET RAISED</Text>
            <Text className="font-bold text-white">
              1 ETH = $1000 = 3177.38 CIC
            </Text>
          </div>
        </div>
        {/* COUNTDOWN */}
        <div className="flex">
          <CountDown />
        </div>
      </div>
    </div>
  );
}

function AboutSection2() {
  return (
    <>
      <div className="section-box-w section-py grid gap-10 pb-14">
        <div className="  flex gap-24 max-xl:gap-10   max-md:flex-col max-md:gap-10 ">
          {/* Image */}
          <div className="w-full max-w-[450px] max-md:max-w-full">
            <div className=" relative h-[600px] max-md:h-[300px]">
              <Image
                src={"/sites/real-estate/demo-real-estate-slider-01.jpg"}
                fill
                alt="Picture of the author"
                className="z-0 object-cover"
              />
              <h2 className="absolute bottom-0 right-0 w-full max-w-[300px] bg-black px-10 py-10 text-3xl font-semibold max-sm:p-4 max-sm:text-base">
                We develop & create digital future.
              </h2>
            </div>
          </div>
          {/* Text box */}
          <div className="flex flex-col justify-center gap-4  max-md:w-full">
            <Heading3>WHAT WE DO</Heading3>
            <Heading2>Create your own AI business easily</Heading2>

            <Text className="max-w-[400px] pb-6   max-md:max-w-full max-sm:py-2  ">
              Adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis.
            </Text>

            <div className="max-sm:item-start flex w-full flex-wrap items-center gap-5 self-start   max-md:pt-5   max-sm:justify-start">
              <PrimaryButton>About community</PrimaryButton>
            </div>
          </div>
        </div>
        {/* LOGOS grid*/}
        <div className="flex w-full items-center justify-stretch  max-md:grid">
          <div className="grid w-full grid-cols-6 flex-wrap gap-5 max-md:grid-cols-3 max-sm:grid-cols-2">
            {[
              {
                icon: (
                  <Image
                    loading="lazy"
                    src={sitePath.concat("/logos/agl.png")}
                    alt="Picture of the author"
                    fill
                    className="object-contain"
                    // className="object-contain"
                  />
                ),
              },
              {
                icon: (
                  <Image
                    loading="lazy"
                    src={sitePath.concat("/logos/citi.png")}
                    alt="Picture of the author"
                    fill
                    className="object-contain"
                  />
                ),
              },
              {
                icon: (
                  <Image
                    loading="lazy"
                    src={sitePath.concat("/logos/energy.png")}
                    alt="Picture of the author"
                    fill
                    className="object-contain"
                  />
                ),
              },
              {
                icon: (
                  <Image
                    loading="lazy"
                    src={sitePath.concat("/logos/github.png")}
                    alt="Picture of the author"
                    fill
                    className="object-contain"
                  />
                ),
              },
              {
                icon: (
                  <Image
                    loading="lazy"
                    src={sitePath.concat("/logos/theater.png")}
                    alt="Picture of the author"
                    fill
                    className="object-contain"
                  />
                ),
              },
              {
                icon: (
                  <Image
                    loading="lazy"
                    src={sitePath.concat("/logos/elo.png")}
                    alt="Picture of the author"
                    fill
                    className="object-contain"
                  />
                ),
              },
            ].map((item, i) => (
              <div
                className="relative grid h-[180px] w-full place-items-center content-center justify-center gap-2 opacity-30  transition-all   duration-300 ease-in-out hover:scale-105 hover:opacity-100 max-md:h-[130px] max-sm:h-[100px]"
                key={i}
              >
                <div className="relative size-40">{item.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function TestimonialSection() {
  const { onPrevButtonClick, onNextButtonClick, emblaRef } = useEmbla({});

  return (
    <div className="section-box-w relative flex max-w-[960px] flex-col justify-center ">
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
                      <p className="text-xl leading-loose max-sm:text-base">
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
          className="absolute left-[-6em] h-20 w-20 cursor-pointer rounded-full bg-transparent   text-white"
        >
          <BsArrowLeft />
        </span>
        <span
          onClick={onNextButtonClick}
          className="absolute  right-[-6em] h-20 w-20  cursor-pointer  rounded-full bg-transparent    text-white"
        >
          <BsArrowRight />
        </span>
      </div>
    </div>
  );
}

function PricingSection() {
  return (
    <div
      id="pricing"
      className="section-box-w section-py flex flex-row-reverse gap-10 pt-0   max-xl:flex-col-reverse"
    >
      {/* Image */}
      <div className="grid w-full max-w-full grid-cols-2 gap-10 max-[600px]:grid-cols-1 max-sm:gap-4">
        {[
          {
            title: "Silver Pack",
            desc: "Great for private individuals",
            price: 99,
            features: ["1 User", "Unlimited Projects", "Download prototypes"],
          },
          {
            title: "Gold Pack",
            desc: "Great for small teams",
            price: 199,
            features: ["5 Users", "Unlimited Projects", "Download prototypes"],
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex w-full  flex-col place-items-center gap-10 rounded-xl bg-black   px-4 py-10 max-sm:p-10"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <h4 className="text-2xl font-bold"> {item.title}</h4>
              <Text> {item.desc}</Text>
            </div>
            <div className="relative flex items-end">
              <div className="absolute left-[-1em] top-0 text-lg">$</div>
              <div className="text-[60px] font-bold leading-tight max-sm:text-[44px]">
                {item.price}
              </div>
              <div className="relative bottom-3 left-2 text-base font-bold">
                /Mo
              </div>
            </div>
            <div className="flex flex-col gap-4 text-center">
              {item.features.map((feature, i) => (
                <Text key={i}>{feature}</Text>
              ))}
            </div>
            <div className="content-end">
              <PrimaryButton>Get started</PrimaryButton>
            </div>
          </div>
        ))}
      </div>
      {/* Text box */}
      <div className="flex  flex-col gap-4  max-[1300px]:max-w-[50em]">
        <Heading3>FLEXIBLE & AFFORDABLE</Heading3>
        <Heading2>Our Pricing Plans</Heading2>
        <Text>
          Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis.
        </Text>
        <div className="flex w-full flex-col flex-wrap  gap-10 pt-14  ">
          {[
            {
              text: "10,000+ people trusting our models.",
              desc: "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
              icon: <IoCheckmark />,
            },
            {
              text: "No hidden fees or extra charges",
              desc: "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
              icon: <IoCheckmark />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-wrap  items-start gap-6 max-sm:flex-col"
            >
              <div className="relative size-10 max-w-[80px]   overflow-hidden rounded-[100%] text-[40px] text-purple-500">
                <IoCheckmark />
              </div>
              <div className="flex flex-1 flex-col gap-4">
                <div className="font-bold">{item.text}</div>
                <Text>{item.desc}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <>
      <div className="bg-gray-900">
        <div className="section-box-w">
          <div className="flex flex-wrap items-center justify-between gap-10 rounded-xl bg-purple-600 px-14 py-14 max-md:flex-wrap max-md:justify-center max-sm:gap-4 max-sm:px-6 max-sm:py-6">
            <div className="flex flex-col  gap-5 max-md:w-full max-md:text-center">
              <Heading2>
                Subscribe to{" "}
                <span className="font-bold underline">newsletter</span>
              </Heading2>
              <Text>Social media its ways of our excellence.</Text>
            </div>
            <div className="relative flex h-[60px] w-full max-w-[500px] items-center justify-between gap-4  rounded-lg bg-white px-4  ">
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
    <div id="about" className="section-box-w section-py flex flex-col gap-10">
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
            icon: <IoIosGitNetwork />,
            bg: "bg-yellow-100",
          },
          {
            title: "Face Recognition",
            icon: <CiFaceMeh />,
            bg: "bg-red-100",
          },
          {
            title: "Computer Vision",
            icon: <MdSensorOccupied />,
            bg: "bg-orange-100",
          },
          {
            title: "Automated Reasoning",
            icon: <GoGitCompare />,
            bg: "bg-yellow-100",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex min-h-[150px] flex-col items-start justify-center gap-2  border-r-2 border-gray-700 pl-4 first:p-0 last:border-none max-md:border-none max-md:p-0 [&>.icon]:hover:text-purple-500 [&>a]:hover:text-purple-400 "
          >
            <div
              className={`icon text-[50px] text-gray-600 transition-all duration-300 ease-in-out`}
            >
              {item.icon}
            </div>
            <h3 className="max-w-[100px] pb-6 pt-3 text-xl font-bold max-sm:text-base">
              {item.title}
            </h3>
            <a className="flex-center cursor-pointer gap-4 transition-all duration-300 ease-in-out">
              Read more
              <FaArrowRight />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

const galleryTabs = ["Art Direction", "Illustration", "Design", "Creative"];

function GalleryTabSection() {
  return (
    <>
      <div id="showcase" className="section-box-w section-pb">
        <Tabs defaultValue={galleryTabs[0]} className="bg-none">
          <TabsList className="max-h-auto mb-10 flex h-auto justify-start gap-5 bg-transparent max-md:flex-wrap">
            {galleryTabs.map((tab, i) => (
              <TabsTrigger
                key={i}
                value={tab}
                className="hover:bg-purple-600 hover:text-white"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {galleryTabs.map((tab, i) => (
            <TabsContent key={i} value={tab}>
              <div className="grid h-[1000px] grid-cols-4 grid-rows-3 gap-4  max-lg:grid-cols-2 max-lg:grid-rows-none">
                {Array(7)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        (i === 0 || i == 3) && "max-lg:col-span-2",
                        i === 1 && "col-span-2 row-span-2  max-lg:col-span-1 ",
                        i === 3 && "row-span-2",
                        i === 6 && "col-span-2",
                        "relative w-full bg-gray-300   max-lg:row-span-1",
                      )}
                    >
                      {i}
                      <Image
                        src={
                          "/sites/real-estate/demo-real-estate-slider-01.jpg"
                        }
                        fill
                        alt="Picture of the author"
                        className="object-cover"
                      />
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
}

export function View() {
  return (
    <main className="bg-gray-900 text-white">
      <WelcomeSection />
      <AboutSection />
      <GalleryTabSection />
      <TestimonialSection />
      <AboutSection2 />
      <PricingSection />
      <CTASection />
    </main>
  );
}
