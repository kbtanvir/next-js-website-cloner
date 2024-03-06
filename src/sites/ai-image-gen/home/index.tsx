import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CiFaceMeh } from "react-icons/ci";
import { GoGitCompare } from "react-icons/go";
import { MdSensorOccupied } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { sitePath } from "@/pages/sites/ai-image-gen";
import Image from "next/image";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FaArrowRight, FaRegEnvelope } from "react-icons/fa";
import { IoIosGitNetwork, IoMdQuote } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { useEmbla } from "../../../hooks/useEmbla";
import { GenerationForm } from "./GenerationForm";
import { UpscaleForm } from "./UpscaleForm";
import { VariationsForm } from "./VariationsForm";

export function LinkText({
  children = <>This is a link</>,
  reverseColor = false,
  className,
}: {
  children?: React.ReactNode;
  reverseColor?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "transition-all hover:text-purple-500",
        reverseColor ? "text-purple-500" : `text-white`,
        className,
      )}
    >
      {children}
    </div>
  );
}
function Heading3({
  children = <>This is heading 3</>,
  reverseColor = false,
  className,
}: {
  children?: React.ReactNode;
  reverseColor?: boolean;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-[20px] uppercase  max-sm:text-[14px]",
        !reverseColor ? "text-white" : `text-black`,
        className,
      )}
    >
      {children}
    </h3>
  );
}
function Heading2({
  reverseColor = false,
  children = <>This is heading 2</>,
  className,
}: {
  reverseColor?: boolean;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-[44px] font-bold leading-[1.3em] max-sm:text-[28px] max-sm:leading-normal",
        !reverseColor ? "text-white" : `text-black`,
        className,
      )}
    >
      {children}
    </h2>
  );
}
function Text({
  children = <>This is a text</>,
  reverseColor = false,
  className,
}: {
  children: React.ReactNode;
  reverseColor?: boolean;
  className?: string;
}) {
  return (
    <p
      // className={`max-sm:text-[14px] ${reverseColor ? "text-white" : `text-gray-400`} `}
      className={cn(
        "max-sm:text-[14px]",
        reverseColor ? "text-white" : `text-gray-400`,
        className,
      )}
    >
      {children}
    </p>
  );
}
export function PrimaryButton({
  children = <>Primary Button</>,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "max-sm:max-w-auto h-[45px] bg-purple-600 text-white hover:bg-transparent  hover:ring-2 hover:ring-purple-500",
        className,
      )}
    >
      {children}
    </Button>
  );
}

function Slider1() {
  const { emblaRef, selectedIndex, scrollSnaps, onDotButtonClick } = useEmbla(
    {},
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
                    <div className=" relative h-[300px] w-[700px] max-md:h-[300px] max-sm:h-[200px]">
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
      <div className="flex gap-4 pt-10 max-sm:pt-4">
        <div className="embla__dots flex w-full justify-center gap-4">
          {scrollSnaps.map((_, index) => (
            <Button
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"size-5 rounded-full p-0 hover:bg-purple-600 max-sm:size-2".concat(
                index === selectedIndex ? " bg-purple-600" : " bg-gray-300",
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
}

const formTabs = ["Basic", "Generation", "Variations", "Upscales"] as const;

function BasicForm() {
  return (
    <div className="flex flex-col gap-10">
      <div className="relative mx-auto flex w-full max-w-[500px] items-center justify-between gap-4 rounded-lg bg-white p-1  ">
        <Input
          type="text"
          placeholder="Describe what you want or hit a tag below"
          className="rounded-md border-none bg-gray-100 px-4 text-black max-sm:text-[12px]"
        />
        <PrimaryButton>
          <span className="">Generate</span>
        </PrimaryButton>
      </div>
    </div>
  );
}

function FormTabs() {
  return (
    <>
      <div className=" w-full">
        <Tabs defaultValue={formTabs[0]} className="bg-none ">
          <TabsList className="mx-auto mb-14 flex max-w-[500px] flex-wrap gap-5 bg-transparent max-md:mb-24 max-md:grid max-md:grid-cols-2">
            {formTabs.map((tab, i) => (
              <TabsTrigger
                key={i}
                value={tab}
                className=" hover:bg-purple-600 hover:text-white max-md:h-[40px]   max-md:text-sm max-md:text-white max-md:ring-1 max-md:ring-purple-500 "
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* BASIC FORM */}
          <TabsContent value={formTabs[0]}>
            <BasicForm />
          </TabsContent>

          {/* GENERATION FORM */}
          <TabsContent value={formTabs[1]}>
            <GenerationForm />
          </TabsContent>
          {/* VARIATIONS FORM */}

          <TabsContent value={formTabs[2]}>
            <VariationsForm />
          </TabsContent>

          {/* UPSCALE FORM */}

          <TabsContent value={formTabs[3]}>
            <UpscaleForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function WelcomeSection() {
  return (
    <div id="home">
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
            Be advised that image generation requires an active OpenAI,
            Stability AI or Stable Diffusion token.
          </h3>
          <FormTabs />

          {/* Tags */}

          <div className="flex flex-wrap items-center justify-center gap-10">
            <span className="text-white">Popular Tags</span>
            <div className="flex gap-4 max-sm:flex-wrap max-sm:justify-center">
              {["House", "Apartment", "Villa", "Office"].map((tag, i) => (
                <Button
                  key={i}
                  size={"sm"}
                  className=" bg-black/30 px-4 !text-[12px] text-white ring-1 ring-purple-600 hover:bg-purple-600 hover:text-white  max-sm:px-2 max-sm:py-1"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
          <Text>
            Limits per hour: 80 images for all visitors and up to 2 requests
            from a single visitor.
          </Text>
        </div>

        <div
          className="flex-center mt-10  px-10 py-5 text-xl"
          style={{
            backgroundImage:
              "linear-gradient(315deg, #7606E7 35%, #C300FF 50%)",
          }}
        >
          Three APIs integrated: OpenAI, Stable Diffusion and Stability AI (100+
          models combined)
        </div>
        <Slider1 />
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
              <Text reverseColor>Social media its ways of our excellence.</Text>
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
