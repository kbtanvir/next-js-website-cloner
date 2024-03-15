import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { BiMoney, BiRocket } from "react-icons/bi";
import {
  FaArrowLeft,
  FaArrowRight,
  FaRegEnvelope,
  FaStar,
} from "react-icons/fa";
import { useEmblaNavigation } from "../../../hooks/useEmbla";

import { Input } from "@/components/ui/input";
import { siteNavigation } from "@/lib/const/navigation";
import { globalStore } from "@/utils/global.store";
import { useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { GiIdea } from "react-icons/gi";
import { Button } from "../components/button";
import { Text } from "../components/text";
import { Heading2, Heading3, LinkText, classes } from "../theme";

function WelcomeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    globalStore.setNavBarFixed(!isInView);
  }, [isInView]);

  return (
    <div ref={ref} className="relative grid h-[80vh] w-full">
      {/* image */}
      <div className="absolute left-0 top-0 z-0 h-full w-full">
        <div className="relative h-full">
          <div className="absolute top-0 z-10 h-full w-full  bg-gradient-to-l from-black/5 to-gray-900 mix-blend-multiply" />
          <Image
            src={`${siteNavigation.agency.home.path}/welcome.png`}
            fill
            alt="Picture of the author"
            className="z-0 object-cover"
          />
        </div>
      </div>
      <div
        className={`section-box-w max-md:flex-center relative top-0 z-10 flex  h-full cursor-pointer items-start gap-5 bg-transparent max-md:gap-0  `}
      >
        <div className="flex h-full w-full flex-col justify-center gap-4 bg-opacity-50">
          <Heading3 className="text-white">GROW YOUR BUSINESS WITH US</Heading3>

          <Heading2 className="max-w-[600px] text-white">
            We craft the <span className="font-bold">most unique </span>
            business ideas.
          </Heading2>

          <div className="flex gap-4 max-md:flex-wrap">
            <Link href={siteNavigation.agency.home.path}>
              <Button className="mt-2 text-white     ">Schedule Visit</Button>
            </Link>
            <Link href={siteNavigation.agency.home.path}>
              <Button className="mt-2 text-white" variant="outline">
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
    <div className="section-box-w">
      <div className="grid w-full  grid-cols-3  content-start  gap-8 max-xl:grid-cols-2 max-md:grid-cols-1 max-md:py-10 max-sm:gap-3 max-sm:py-4">
        {[
          {
            title: "Grow your business",
            icon: <GiIdea />,
            subtitle:
              "We believe in challenges and so we have made challenges.",
            bg: "bg-yellow-100",
          },
          {
            title: "Cost savings ideas",
            icon: <BiMoney />,
            subtitle: "We also help our clients with social media strategy.",
            bg: "bg-red-100",
          },

          {
            title: "Boost performance",
            icon: <BiRocket />,
            subtitle: "We deliver email marketing campaigns to your audience.",
            bg: "bg-yellow-100",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start justify-center   gap-10 rounded-lg   "
          >
            <div className={`pt-4 text-[50px] ${classes.textColor}`}>
              {item.icon}
            </div>
            <div className="grid w-full gap-4">
              <h3 className="pt-3 text-lg font-bold">{item.title}</h3>
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
    <>
      <div className="section-box-w section-py grid gap-40">
        <OfferingsCards />
        {/* ABOUT */}
        <div className=" flex-center gap-24 max-xl:gap-10   max-md:flex-col max-md:gap-10 ">
          {/* Image */}
          <div className="flex w-1/2 flex-col">
            <div className="relative size-[400px] overflow-hidden rounded-2xl max-md:h-[400px]">
              <Image
                src={`${siteNavigation.agency.home.path}/about1.png`}
                fill
                alt="Picture of the author"
                className="z-0 object-cover object-top"
              />
            </div>
            <div className="relative left-[100px] top-[-100px] size-[400px]   overflow-hidden rounded-2xl   max-md:hidden  ">
              <Image
                src={`${siteNavigation.agency.home.path}/about2.png`}
                fill
                alt="Picture of the author"
                className="z-0 object-cover object-top"
              />
            </div>
          </div>
          {/* Text box */}
          <div className="flex w-1/2 flex-col justify-center  gap-4 max-md:w-full">
            <Heading3>CREATIVE APPROACH</Heading3>
            <Heading2>
              <span>Powerful agency </span> for corporate business.
            </Heading2>

            <Text className="max-w-[400px] py-6 leading-9 max-md:max-w-full max-sm:py-2 max-sm:leading-normal ">
              We strive to develop real-world web solutions that are ideal for
              small to large projects with bespoke project requirements. We
              create compelling web designs, which are the right-fit for your
              target groups and also deliver optimized.
            </Text>

            <div className="max-sm:item-start flex w-full flex-wrap items-center gap-5 self-start pt-10 max-md:pt-5   max-sm:justify-start">
              <Button>About us</Button>
              <LinkText className="flex-center gap-2 pl-5">
                Our services <FaArrowRight />
              </LinkText>
            </div>
          </div>
        </div>
        {/* PARTNERS */}
        <div className="flex w-full flex-col items-center justify-stretch gap-10  ">
          <div className="grid w-full grid-cols-5 flex-wrap   max-md:grid-cols-3 max-sm:grid-cols-2">
            {[
              {
                icon: (
                  <Image
                    loading="lazy"
                    src={siteNavigation.agency.home.path.concat(
                      "/logos/walmart.png",
                    )}
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
                    src={siteNavigation.agency.home.path.concat(
                      "/logos/netflix.png",
                    )}
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
                    src={siteNavigation.agency.home.path.concat(
                      "/logos/invision.png",
                    )}
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
                    src={siteNavigation.agency.home.path.concat(
                      "/logos/yahoo.png",
                    )}
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
                    src={siteNavigation.agency.home.path.concat(
                      "/logos/amazon.png",
                    )}
                    alt="Picture of the author"
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
    </>
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
                          alt="Picture of the author"
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
      <>
        <div className="section-box-w section-py flex gap-24 max-xl:gap-10 max-md:flex-col max-md:gap-10">
          {/* Image */}
          <div className="w-full   max-md:max-w-full">
            <div className=" relative aspect-square w-[400px] overflow-hidden rounded-full max-md:h-[300px]">
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
            <Heading3>Clients feedback</Heading3>
            <Heading2>
              Here is what our{" "}
              <span className="underline-green-300 font-bold text-purple-600 underline">
                clients
              </span>{" "}
              have to say
            </Heading2>
            {/* Testimonial slider */}{" "}
            <div className="grid max-w-[400px] pt-6 max-md:max-w-[100vw]">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {[
                    {
                      text: "Alec Thompson",
                      desc: "I just bought a house with the help of this company. Thank you for your support and help with finding me a home. I am very happy with the service and the help, everything was perfect. Thank you very much.",
                      icon: (
                        <Image
                          src={`${siteNavigation.agency.home.path}/loan.png`}
                          alt=""
                          fill
                        />
                      ),
                      rating: 5,
                    },
                    {
                      text: "Alec Thompson",
                      desc: "I just bought a house with the help of this company. Thank you for your support and help with finding me a home. I am very happy with the service and the help, everything was perfect. Thank you very much.",
                      icon: (
                        <Image
                          src={`${siteNavigation.agency.home.path}/loan.png`}
                          alt=""
                          fill
                        />
                      ),
                      rating: 5,
                    },
                    {
                      text: "Alec Thompson",
                      desc: "I just bought a house with the help of this company. Thank you for your support and help with finding me a home. I am very happy with the service and the help, everything was perfect. Thank you very much.",
                      icon: (
                        <Image
                          src={`${siteNavigation.agency.home.path}/loan.png`}
                          alt=""
                          fill
                        />
                      ),
                      rating: 5,
                    },
                  ].map((item, i) => (
                    <div key={i} className=" ml-10 ">
                      <div className="grid  w-[400px] gap-10    max-sm:w-[100vw]">
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative flex gap-4 pt-10">
              <Button
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                variant={"outline"}
                className="h-20 w-20 min-w-0 rounded-full   text-[20px]  "
              >
                <FaArrowLeft />
              </Button>
              <Button
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                variant={"outline"}
                className="h-20 w-20  min-w-0   rounded-full   text-[20px]  "
              >
                <FaArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
function CTASection() {
  return (
    <>
      <div className="min-h-[10em] border-t-2 bg-gray-50 ">
        <div className="section-box-w mt-[-6em] max-md:mt-0 max-md:pt-20 max-sm:pt-10">
          <div
            className={`flex flex-wrap items-center justify-between gap-10 rounded-xl   px-14 py-14 max-md:flex-wrap max-md:justify-center max-sm:gap-4 max-sm:px-4 max-sm:py-4 ${classes.bgColor}`}
          >
            <div className="flex flex-col  gap-5 max-md:w-full max-md:text-center max-sm:gap-0 ">
              <Heading2>Subscribe to our newsletter</Heading2>
              <Text>Social media its ways of our excellence.</Text>
            </div>
            <div className="relative flex h-[80px] w-full   items-center justify-between gap-4  rounded-full bg-white px-4  ">
              <Input
                type="text"
                placeholder="Enter your email"
                className="h-[60px] rounded-full border-none  px-4 text-black max-sm:text-[12px]"
              />
              <Button
                variant={"outline"}
                className="right-2 flex h-[55px] gap-2 bg-white uppercase  text-black max-md:min-w-0 [&>.icon]:hover:text-white"
              >
                <FaRegEnvelope
                  className={`${classes.textColor} icon text-2xl max-md:text-xl max-sm:text-base`}
                />
                <span className="max-md:hidden">Subscribe</span>
              </Button>
            </div>
          </div>
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
                  alt="Picture of the author"
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
                  alt="Picture of the author"
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
                  alt="Picture of the author"
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
                  alt="Picture of the author"
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
                  alt="Picture of the author"
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
                  alt="Picture of the author"
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
                  alt="Picture of the author"
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
                  alt="Picture of the author"
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
                  alt="Picture of the author"
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
                  alt="Picture of the author"
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
      <AboutSection />
      {/* <CategorySection /> */}
      <CaseStudySliderSection />
      <ServicesSection />
      {/* <CaseStudiesSection />
      <WhyUs1Section /> */}
      <TestimonialSection />
      <CTASection />
    </main>
  );
}
