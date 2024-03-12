import { Paths } from "@/lib/const/navigation";
import Image from "next/image";
import Link from "next/link";
import { LinkText } from "../home";

const footerCompanyNavLinks = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Shop",
    url: "/shop",
  },
  {
    title: "Blog",
    url: "/blog",
  },
  {
    title: "Contact",
    url: "/contact",
  },
];

const footerQuickLinks = [
  {
    title: "FAQ",
    url: "/faq",
  },
  {
    title: "Privacy Policy",
    url: "/privacy-policy",
  },
  {
    title: "Refund Policy",
    url: "/refund-policy",
  },
  {
    title: "Terms of Service",
    url: "/terms-of-service",
  },
];

function FooterTop() {
  return (
    <div className="mt-9 flex grid-cols-7 grid-rows-1 justify-between gap-20   max-md:flex max-md:flex-col max-md:items-center max-md:gap-10 max-md:text-center ">
      {/* ABOUT */}
      <div className="col-span-2 flex w-full max-w-[300px] flex-col items-start justify-start max-lg:col-start-1 max-lg:col-end-4 max-md:items-center ">
        <Link href={Paths.home.path} className="text-nowrap ">
          <div className="text-[30px] font-light uppercase max-md:text-2xl ">
            E-shopper
          </div>
        </Link>
        <div className="mt-4 self-stretch text-base leading-7   text-opacity-80">
          The exciting contemporary brand eshopper is known for its attention to
          detail and premium graphics.
        </div>
      </div>
      {/* COMPANY links */}
      <span className="col-span-1 flex flex-col max-lg:col-start-5 max-lg:col-end-7">
        <div className="text-xl font-bold leading-7 ">Company</div>
        <div className="mt-8 grid gap-4">
          {footerCompanyNavLinks.map((item, index) => (
            <Link href={"#"} key={index}>
              <LinkText className="text-sm transition-all hover:text-purple-500">
                {item.title}
              </LinkText>
            </Link>
          ))}
        </div>
      </span>
      {/* QUICK links */}
      <span className="col-span-2 flex flex-col max-lg:col-start-5 max-lg:col-end-7">
        <div className="text-xl font-bold leading-7 ">Quicklinks</div>
        <div className="mt-8 grid gap-5">
          {footerQuickLinks.map((item, index) => (
            <Link href={"#"} key={index}>
              <LinkText className="text-sm">{item.title}</LinkText>
            </Link>
          ))}
        </div>
      </span>
      {/* QUICK links */}
      <span className="col-span-2 flex flex-1 flex-col max-lg:col-start-5 max-lg:col-end-7">
        <div className="text-xl font-bold leading-7 ">Say Hello</div>
        <div className="mt-8 grid gap-5">
          <div className="text-xl font-bold ">+880 555 555 555</div>
          <div className="text-sm ">123, New Eskaton Road, Dhaka</div>
          <div className="text-sm ">Bangladesh</div>
        </div>
      </span>
      {/* <div className="flex-1"></div> */}
    </div>
  );
}

export function FooterSection() {
  return (
    <div className="bg-gray-900 text-white">
      <div className="section-box-w pt-10 ">
        <FooterTop />
        <div className=" mt-10 flex h-px shrink-0 flex-col bg-gray-800 bg-opacity-10" />
        <span className="relative flex w-full items-center justify-between gap-5 py-11 max-md:flex-wrap max-md:justify-center">
          <div className="my-auto  text-base leading-4  text-opacity-80 max-sm:text-sm">
            © 2024, Developed By K. B. Tanvir
          </div>
          <Image
            alt=""
            src="/images/footerlogos.png"
            className="max-w-full object-contain"
            height={24}
            width={278}
          />
        </span>
      </div>
    </div>
  );
}
