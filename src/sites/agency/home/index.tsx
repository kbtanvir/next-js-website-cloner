import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEmbla, useEmblaNavigation } from "../../../hooks/useEmbla";

import { siteNavigation } from "@/lib/const/navigation";
import { globalStore } from "@/utils/global.store";
import { useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { IoMdQuote } from "react-icons/io";
import { Button } from "../components/button";
import { Text } from "../components/text";
import { Heading2, Heading3, LinkText, classes } from "../theme";
import { Contactform } from "./ContactForm";

function WelcomeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    globalStore.setNavBarFixed(!isInView);
  }, [isInView]);

  return (
    <div ref={ref} className="relative grid h-[80vh] w-full max-md:h-[60vh]">
      {/* image */}
      <div className="absolute left-0 top-0 z-0 h-full w-full">
        <div className="relative h-full">
          <div className="absolute top-0 z-10 h-full w-full  bg-gradient-to-l from-black/5 to-gray-900 mix-blend-multiply" />
          <Image
            src={`${siteNavigation.agency.home.path}/welcome.png`}
            fill
            alt=""
            className="z-0 object-cover"
          />
        </div>
      </div>
      <div
        className={`section-box-w max-md:flex-center relative top-0 z-10 flex  h-full cursor-pointer items-start gap-5 bg-transparent max-md:gap-0  `}
      >
        <div className="flex h-full w-full flex-col justify-center gap-4 bg-opacity-50 max-sm:text-center">
          <Heading3 className="max-sm:flex-center text-white max-sm:w-full max-sm:gap-4">
            GROW YOUR BUSINESS WITH US
          </Heading3>

          <Heading2 className="max-w-[600px] text-white">
            We craft the <span className="font-bold">most unique </span>
            business ideas.
          </Heading2>

          <div className="flex gap-4 pt-4 max-md:flex-wrap max-sm:justify-center">
            <Link href={siteNavigation.agency.home.path}>
              <Button className="mt-2 hover:text-white">Schedule Visit</Button>
            </Link>
            <Link href={siteNavigation.agency.home.path}>
              <Button
                className="mt-2 text-white hover:text-black"
                variant="outline"
              >
                View details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
function OfferingsCards() {
  return (
    <div className="bg-slate-100 py-14 max-md:py-10">
      <div className="section-box-w grid w-full grid-cols-3 content-start  gap-14  max-[960px]:gap-4 max-[960px]:text-sm  max-sm:grid-cols-1 max-sm:gap-10">
        {[
          {
            title: "Grow your business",
            icon: `${siteNavigation.agency.home.path}/icons/idea.png`,
            subtitle:
              "We believe in challenges and so we have made challenges.",
            bg: "bg-yellow-100",
          },
          {
            title: "Cost savings ideas",
            icon: `${siteNavigation.agency.home.path}/icons/money-bag.png`,
            subtitle: "We also help our clients with social media strategy.",
            bg: "bg-red-100",
          },

          {
            title: "Boost performance",
            icon: `${siteNavigation.agency.home.path}/icons/performance.png`,
            subtitle: "We deliver email marketing campaigns to your audience.",
            bg: "bg-yellow-100",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start justify-center gap-8 rounded-lg max-md:flex-col max-sm:flex-row"
          >
            <div className={`text-[50px] ${classes.textColor}`}>
              <div className="relative size-[60px] max-sm:size-[50px]">
                <Image src={item.icon} fill alt="" className="object-contain" />
              </div>
            </div>
            <div className="grid w-full gap-2">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-gray-400">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function AboutSection() {
  return (
    <div className="section-box-w section-py">
      {/* ABOUT */}
      <div className="flex-center gap-24 max-xl:gap-20 max-md:flex-col max-sm:gap-10">
        {/* Image */}
        <div className="relative flex w-1/2 flex-col gap-10 max-[960px]:w-full  max-md:flex-row max-sm:gap-4">
          <div className="relative size-[400px] overflow-hidden rounded-2xl  max-[960px]:w-full max-sm:h-[200px]">
            <Image
              src={`${siteNavigation.agency.home.path}/about1.png`}
              fill
              alt=""
              className="z-0 object-cover object-top"
            />
          </div>
          <div className="absolute bottom-[-120px] left-[150px] size-[300px] overflow-hidden rounded-2xl  max-[960px]:relative max-[960px]:left-0 max-[960px]:top-0 max-[960px]:w-full max-sm:h-[200px]">
            <Image
              src={`${siteNavigation.agency.home.path}/about2.png`}
              fill
              alt=""
              className="z-0 object-cover object-top"
            />
          </div>
        </div>
        {/* Text box */}
        <div className="flex w-1/2 flex-col justify-center gap-4  max-[960px]:w-full max-md:w-full">
          <Heading3>CREATIVE APPROACH</Heading3>
          <Heading2>
            <span>Powerful agency </span> for corporate business.
          </Heading2>

          <Text className="max-w-[400px] py-6 leading-9 max-[960px]:max-w-full max-md:max-w-full max-md:py-0 max-sm:py-2 max-sm:leading-normal ">
            We strive to develop real-world web solutions that are ideal for
            small to large projects with bespoke project requirements. We create
            compelling web designs, which are the right-fit for your target
            groups and also deliver optimized.
          </Text>

          <div className="max-sm:item-start flex w-full flex-wrap items-center gap-5 self-start pt-10 max-[960px]:pt-0  max-md:pt-5   max-sm:justify-center">
            <Button className="max-sm:w-full">About us</Button>
            <LinkText className="flex-center gap-2 pl-5 font-semibold">
              Our services <FaArrowRight />
            </LinkText>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudySliderSection() {
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
        <div className="section-box-w relative flex flex-col gap-14 max-lg:flex-wrap">
          {/* text box */}
          <div className="flex w-full content-center items-center justify-between gap-4">
            <Heading2>
              Our Latest <span>Projects</span>
            </Heading2>

            <div className="relative flex gap-4 max-md:hidden">
              <Button
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                className="h-20 w-20 min-w-0   rounded-full bg-white  text-[20px] text-gray-600"
              >
                <FaArrowLeft />
              </Button>
              <Button
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                className="h-20 w-20 min-w-0  rounded-full     bg-white text-[20px]  text-gray-600"
              >
                <FaArrowRight />
              </Button>
            </div>
          </div>
          {/* slider */}
          <div className="mr-[-20vw] ">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex max-w-[100em]  max-xl:max-w-[44em] max-lg:max-w-[100vw]">
                {" "}
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div className="ml-10 flex max-sm:ml-4" key={i}>
                      <div className="relative  h-[485px] w-[380px] max-sm:h-[280px] max-sm:w-[200px]">
                        {/* <div className="relative  h-[485px] w-[360px]"> */}
                        <Image
                          src={
                            "/sites/real-estate/demo-real-estate-slider-01.jpg"
                          }
                          fill
                          alt=""
                          className="z-0 object-cover"
                        />
                        {/* </div> */}
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
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TestimonialSection() {
  const { onPrevButtonClick, onNextButtonClick, emblaRef } = useEmbla({});

  return (
    <div className="section-box-w section-py relative flex max-w-[960px] flex-col justify-center">
      {/* SECTION TITLE */}
      <div className="flex-center flex-col pb-10 text-center">
        <Heading3>Testimonials</Heading3>
        <Heading2 className="capitalize">
          We are loved by our <span>Customers</span>
        </Heading2>
      </div>
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
                            alt=""
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
      {/* PARTNERS */}
      <div className="flex w-full flex-col items-center justify-stretch gap-10 pt-20  ">
        <div className="grid w-full grid-cols-5 flex-wrap   max-md:grid-cols-3 max-sm:grid-cols-2">
          {[
            {
              icon: (
                <Image
                  loading="lazy"
                  src={siteNavigation.agency.home.path.concat(
                    "/logos/walmart.png",
                  )}
                  alt=""
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
                  src={siteNavigation.agency.home.path.concat(
                    "/logos/netflix.png",
                  )}
                  alt=""
                  fill
                  className="object-contain"
                />
              ),
            },
            {
              icon: (
                <Image
                  loading="lazy"
                  src={siteNavigation.agency.home.path.concat(
                    "/logos/invision.png",
                  )}
                  alt=""
                  fill
                  className="object-contain"
                />
              ),
            },
            {
              icon: (
                <Image
                  loading="lazy"
                  src={siteNavigation.agency.home.path.concat(
                    "/logos/yahoo.png",
                  )}
                  alt=""
                  fill
                  className="object-contain"
                />
              ),
            },
            {
              icon: (
                <Image
                  loading="lazy"
                  src={siteNavigation.agency.home.path.concat(
                    "/logos/amazon.png",
                  )}
                  alt=""
                  fill
                  className="object-contain"
                />
              ),
            },
          ].map((item, i) => (
            <div
              className="relative grid h-[100px] w-full place-items-center content-center justify-center gap-2 max-md:h-[80px]  max-sm:border-b-2 last:max-sm:border-b-0"
              key={i}
            >
              <div className="relative size-[130px]">{item.icon}</div>
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
      <div className="relative bg-black">
        <Image
          src={`${siteNavigation.agency.home.path}/cta.png`}
          fill
          alt=""
          className="z-0 object-cover"
        />
        <div className="absolute h-full w-full bg-gray-600/60 mix-blend-multiply"></div>
        <div className="section-box-w section-py  relative z-10  flex justify-start">
          <Contactform />
        </div>
      </div>
    </>
  );
}

function ServicesSection() {
  return (
    <div className="section-py bg-slate-800 ">
      <div className="section-box-w flex w-full flex-col items-center justify-center gap-20 text-center">
        <div className="flex-center flex w-full flex-col gap-10">
          <Heading3 className="text-white">Our Services</Heading3>
          <Heading2 className="text-white">
            Understanding the <span>business services</span>.
          </Heading2>
        </div>
        <div className="grid w-full grid-cols-5 flex-wrap   max-md:grid-cols-3 max-sm:grid-cols-2">
          {[
            {
              icon: (
                <Image
                  loading="lazy"
                  src={siteNavigation.agency.home.path.concat(
                    "/services/web.png",
                  )}
                  alt=""
                  fill
                  className="object-contain"
                  // className="object-contain"
                />
              ),
              text: "Web Development",
            },
            {
              icon: (
                <Image
                  loading="lazy"
                  src={siteNavigation.agency.home.path.concat(
                    "/services/digital-marketing.png",
                  )}
                  alt=""
                  fill
                  className="object-contain"
                />
              ),
              text: "Digital Marketing",
            },
            {
              icon: (
                <Image
                  loading="lazy"
                  src={siteNavigation.agency.home.path.concat(
                    "/services/seo.png",
                  )}
                  alt=""
                  fill
                  className="object-contain"
                />
              ),
              text: "SEO Optimization",
            },
            {
              icon: (
                <Image
                  loading="lazy"
                  src={siteNavigation.agency.home.path.concat(
                    "/services/content-writing.png",
                  )}
                  alt=""
                  fill
                  className="object-contain"
                />
              ),
              text: "Content Marketing",
            },
            {
              icon: (
                <Image
                  loading="lazy"
                  src={siteNavigation.agency.home.path.concat(
                    "/services/social-media1.png",
                  )}
                  alt=""
                  fill
                  className="object-contain"
                />
              ),
              text: "Social Media Marketing",
            },

            {
              icon: (
                <Image
                  loading="lazy"
                  src={siteNavigation.agency.home.path.concat(
                    "/services/email-marketing.png",
                  )}
                  alt=""
                  fill
                  className="object-contain"
                />
              ),
              text: "Email Marketing",
            },
            {
              icon: (
                <Image
                  loading="lazy"
                  src={siteNavigation.agency.home.path.concat(
                    "/services/graphics-design.png",
                  )}
                  alt=""
                  fill
                  className="object-contain"
                />
              ),
              text: "Graphic Design",
            },
            {
              icon: (
                <Image
                  loading="lazy"
                  src={siteNavigation.agency.home.path.concat(
                    "/services/video-marketing.png",
                  )}
                  alt=""
                  fill
                  className="object-contain"
                />
              ),
              text: "Video Marketing",
            },
            {
              icon: (
                <Image
                  loading="lazy"
                  src={siteNavigation.agency.home.path.concat(
                    "/services/mobile-development.png",
                  )}
                  alt=""
                  fill
                  className="object-contain"
                />
              ),
              text: "Mobile App Development",
            },
            {
              icon: (
                <Image
                  loading="lazy"
                  src={siteNavigation.agency.home.path.concat(
                    "/services/ecommerce.png",
                  )}
                  alt=""
                  fill
                  className="object-contain"
                />
              ),
              text: "E-commerce Solutions",
            },
          ].map((item, i) => (
            <div
              className="relative grid  w-full cursor-pointer place-items-center  gap-6 border-b-[1px] border-r-[1px] border-white/30 py-10  transition-all  duration-300 ease-in-out last:border-r-0 hover:z-10 hover:scale-105 hover:border-black/0 hover:bg-slate-900 hover:shadow-lg [&:nth-child(5)]:border-r-0 [&:nth-child(n+6)]:border-b-0 [&>.text]:hover:text-[#12D176]"
              key={i}
            >
              <div className="icon relative aspect-[4/2] w-[130px] transition-all duration-300 ease-in-out">
                {item.icon}
              </div>
              <div className="text max-w-[100px] text-[14px] font-semibold uppercase text-white transition-all duration-300 ease-in-out">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export function View() {
  return (
    <main>
      <WelcomeSection />
      <OfferingsCards />
      <AboutSection />
      <CaseStudySliderSection />
      <ServicesSection />
      <TestimonialSection />
      <CTASection />
    </main>
  );
}
