import { Routes } from "@/pages/sites/eshopper";
import Image from "next/image";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";
import { Input } from "../../../components/ui/input";

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
    <div className="mt-9 grid grid-cols-7 grid-rows-1 justify-between gap-20 max-md:flex max-md:flex-col max-md:items-center max-md:gap-10 max-md:text-center">
      {/* ABOUT */}
      <div className="col-span-2 flex w-full max-w-[300px] flex-col items-start justify-start max-lg:col-start-1 max-lg:col-end-4">
        <Link href={Routes.home.path} className="text-nowrap  ">
          <div className="text-[30px]   font-light uppercase max-md:text-2xl ">
            E-shopper
          </div>
        </Link>
        <div className="mt-4 self-stretch text-base leading-7 text-gray-800 text-opacity-80">
          The exciting contemporary brand eshopper is known for its attention to
          detail and premium graphics.
        </div>
      </div>
      {/* COMPANY links */}
      <span className="col-span-1 flex flex-col max-lg:col-start-5 max-lg:col-end-7">
        <div className="text-xl font-bold leading-7 text-gray-800">Company</div>
        <div className="mt-8 grid gap-4">
          {footerCompanyNavLinks.map((item, index) => (
            <div key={index} className="text-sm text-gray-800">
              <Link href={"#"}>{item.title}</Link>
            </div>
          ))}
        </div>
      </span>
      {/* QUICK links */}
      <span className="col-span-2 flex flex-col max-lg:col-start-5 max-lg:col-end-7">
        <div className="text-xl font-bold leading-7 text-gray-800">
          Quicklinks
        </div>
        <div className="mt-8 grid gap-5">
          {footerQuickLinks.map((item, index) => (
            <div key={index} className="text-sm text-gray-800">
              <Link href={"#"}>{item.title}</Link>
            </div>
          ))}
        </div>
      </span>
      {/* NEWSLETTER */}
      <span className="col-span-2 flex flex-col gap-8 max-lg:col-start-1 max-lg:col-end-4 max-lg:row-start-2 max-lg:row-end-3">
        <div className="text-xl font-bold text-gray-800">Newsletter</div>
        <div className="text-base text-gray-800 text-opacity-80">
          Write your email first to know about our latest offers
        </div>
        <div className="flex w-full items-stretch justify-between gap-5 rounded bg-white px-3.5 py-3 shadow-sm">
          <Input
            type="text"
            placeholder="Your email address"
            className="w-full  border-none bg-transparent pl-5 ring-0 focus:ring-0 "
          />
          <div className="flex h-10  w-12 cursor-pointer items-stretch justify-center rounded-md bg-emerald-600 text-2xl text-white transition-colors duration-300 ease-in-out hover:bg-gray-600 hover:text-white">
            <IoIosSend className="my-auto" />
          </div>
        </div>
      </span>
    </div>
  );
}

export function FooterSection() {
  return (
    <div className="bg-slate-50">
      <div className="section-box-w pt-10 max-lg:mt-10 max-md:mt-0">
        <FooterTop />
        <div className=" mt-10 flex h-px shrink-0 flex-col bg-gray-800 bg-opacity-10" />
        <span className="relative flex w-full items-center justify-between gap-5 py-11 max-md:flex-wrap max-md:justify-center">
          <div className="my-auto  text-base leading-4 text-gray-800 text-opacity-80 max-sm:text-sm">
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
