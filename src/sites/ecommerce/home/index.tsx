import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { type IProduct } from "@/features/shop/model";
import { ProductItem } from "@/features/shop/view/ProductItem";
import { Routes } from "@/pages/sites/eshopper";
import { api } from "@/utils/api";
import { globalStore, useGlobalStore } from "@/utils/global.store";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { offeringCardsDemoList } from "../../../features/home/model/demo";

function DiscountSlider() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <Carousel
      plugins={[plugin.current]}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      onMouseEnter={plugin.current.start}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      onMouseLeave={plugin.current.stop}
      className="section-box-w w-full py-32 max-lg:py-10 max-sm:py-0"
    >
      <CarouselContent>
        {[
          {
            title: "Fresh & Healthy Backery",
            discount: "35%",
            bg: "bg-red-100",
          },
          {
            title: "Healthy organic fruits",
            discount: "30%",
            bg: "bg-emerald-100",
          },
          {
            title: "Fresh snacks & drinks",
            discount: "20%",
            bg: "bg-orange-100",
          },
          {
            title: "Fresh & Healthy Backery",
            discount: "35%",
            bg: "bg-red-100",
          },
          {
            title: "Healthy organic fruits",
            discount: "30%",
            bg: "bg-emerald-100",
          },
          {
            title: "Fresh snacks & drinks",
            discount: "20%",
            bg: "bg-orange-100",
          },
        ].map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div
              className={`${item.bg} relative grid h-[250px] w-full cursor-pointer items-start gap-5 overflow-hidden rounded-lg`}
            >
              {/* <Image
              src={"/images/discount.jpg"}
              width={500}
              height={500}
              alt="Picture of the author"
              layout="responsive"
            /> */}
              <div className="absolute z-10 flex h-full w-full flex-col justify-center gap-4 bg-opacity-50 px-10">
                <h3 className="text-[20px]  font-bold text-gray-800 max-md:text-xl">
                  On all fruits
                </h3>
                <h5 className="flex gap-2 text-base max-md:text-base">
                  <span className="font-bold text-emerald-500 underline underline-offset-4">
                    {item.discount}
                  </span>
                  off on first order
                </h5>

                <Link href={Routes.shop.path}>
                  <Button className="mt-2 bg-emerald-500">Shop now</Button>
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

function FeaturedProducts() {
  const { featuredProductActiveTab } = useGlobalStore();

  const query = api.product.getLatestProducts.useQuery({
    limit: 6,
    orderBy: featuredProductActiveTab,
  });

  useEffect(() => {
    void query.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featuredProductActiveTab]);

  if (query.isLoading) return <div>Loading...</div>;

  if (query.isError) return <div>Error...</div>;

  if (!query.data.length) return <div>No data found</div>;

  return query.data.map((item, i) => (
    <ProductItem key={i} item={item as IProduct} refetch={query.refetch} />
  ));
}

function FeaturedProductTab() {
  const { featuredProductActiveTab } = useGlobalStore();

  const query = api.product.getLatestProducts.useQuery({
    limit: 6,
    orderBy: featuredProductActiveTab,
  });

  return (
    <div className="grid w-full content-start items-start gap-2 overflow-hidden">
      {[
        {
          title: "Most popular",
          value: "popularity",
        },
        {
          title: "Latest",
          value: "createdAt",
        },
        {
          title: "Limited collection",
          value: "sale",
        },
      ].map((item, i) => (
        <div
          className="flex h-[70px] cursor-pointer items-center justify-between rounded-lg border border-solid  border-gray-200 bg-gray-50 px-10 font-normal transition-all duration-300 ease-in-out hover:bg-gray-100 hover:text-emerald-700 hover:shadow-sm"
          key={i}
          onClick={async () => {
            globalStore.setFeaturedProductActiveTab(
              item.value as "createdAt" | "popularity" | "sale",
            );
            await query.refetch();
          }}
        >
          {item.title} <FaArrowRight />
        </div>
      ))}
    </div>
  );
}

function FeaturedProductsSection() {
  return (
    <div className="section-box-w">
      <div className="grid items-center justify-center gap-5 py-32 text-center">
        <h2 className="text-[34px] font-bold">Featured Products</h2>
        <p>Check out our latest products</p>
      </div>
      <div className="flex items-start gap-10 max-xl:flex-col">
        <div className="grid h-full w-full max-w-[350px] auto-rows-min items-start gap-10 max-xl:max-w-full max-xl:grid-cols-2  max-sm:grid-cols-1">
          <FeaturedProductTab />
          <div className="relative  w-full rounded-lg">
            <div className="top-0 z-10 flex w-full flex-col place-content-center rounded-lg bg-yellow-100 p-10">
              <h5 className="flex gap-4 text-[26px] font-semibold text-gray-500 max-md:text-base">
                Juicy
              </h5>
              <h3 className="text-[34px] font-black uppercase text-orange-400 max-md:text-2xl max-sm:text-lg">
                Fruits
              </h3>
              <h5 className="flex gap-4 text-[20px] font-semibold text-gray-500 max-md:text-base">
                100% Natural
              </h5>
              <Link href={Routes.shop.path}>
                <Button className="mt-4 bg-emerald-500">Shop now</Button>
              </Link>
            </div>
            <div className="relative left-0 top-0 h-auto w-full">
              <Image
                src={"/images/fpbg.jpg"}
                fill
                objectFit="cover"
                alt="Picture of the author"
                className="absolute left-0 top-0 z-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="autofit-grid-250 grid w-full  gap-5 ">
          {" "}
          <FeaturedProducts />
        </div>
      </div>
    </div>
  );
}

function OfferingsCards() {
  return (
    <div className="section-box-w">
      <div className="grid w-full  grid-cols-4  content-center  gap-8 max-xl:grid-cols-2 max-md:py-10 max-sm:grid-cols-1 max-sm:gap-3 max-sm:py-4">
        {offeringCardsDemoList.map((item, i) => (
          <div
            key={i}
            className="grid min-h-[150px] place-items-center justify-center gap-2 rounded-lg bg-gray-100 p-8 text-center"
          >
            <div className={`text-[50px] text-emerald-600`}>{item.icon}</div>
            <h3 className="pt-3 font-bold">{item.title}</h3>
            <p className="text-gray-400">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
function CategoryCards() {
  return (
    <div className="section-box-w grid grid-cols-4 content-stretch gap-8 pt-32 max-md:grid-cols-2 max-md:pt-10 max-sm:grid-cols-1 max-sm:gap-3 max-sm:py-4 ">
      {[
        {
          title: "Banana",
          count: 10,
          icon: (
            <Image
              src={"/images/banana.png"}
              width={40}
              height={40}
              alt="Picture of the author"
            />
          ),
          bg: "bg-yellow-100",
        },
        {
          title: "Strawberry",
          count: 32,
          icon: (
            <Image
              src={"/images/strawberry.png"}
              width={40}
              height={40}
              alt="Picture of the author"
            />
          ),
          bg: "bg-red-100",
        },
        {
          title: "Orange",
          count: 18,
          icon: (
            <Image
              src={"/images/orange.png"}
              width={40}
              height={40}
              alt="Picture of the author"
            />
          ),
          bg: "bg-orange-100",
        },
        {
          title: "Pinapple",
          count: 22,
          icon: (
            <Image
              src={"/images/pineapple.png"}
              width={40}
              height={40}
              alt="Picture of the author"
            />
          ),
          bg: "bg-yellow-100",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="grid  min-h-[150px] items-center justify-center gap-2 rounded-lg bg-gray-100 p-8 text-center"
        >
          <div
            className={`flex-center relative mt-[-80px] size-[100px] rounded-full border-[10px] border-white text-[50px] max-md:mt-0 max-md:size-[70px] max-md:border-[5px] ${item.bg}`}
          >
            {item.icon}
          </div>
          <h3 className="pt-3 font-bold">{item.title}</h3>
          <h3>({item.count} Items)</h3>
        </div>
      ))}
    </div>
  );
}

function WelcomeSection() {
  return (
    <div className="relative grid min-h-[500px] items-center bg-emerald-200">
      <div className="absolute right-10 top-10 animate-wiggle ">
        <Image
          className="opacity-10 bg-blend-overlay"
          src={"/images/orange.png"}
          width={100}
          height={100}
          alt="Picture of the author"
        />
      </div>
      <div className="absolute bottom-10 left-10 animate-wiggle-lr">
        <Image
          className="opacity-10 bg-blend-overlay"
          src={"/images/salad.png"}
          width={100}
          height={100}
          alt="Picture of the author"
        />
      </div>
      <div className="section-box-w section-px section-py mx-auto flex w-full flex-row-reverse justify-between gap-10 py-20 max-md:flex-col max-md:items-center max-md:gap-0">
        <div className="relative max-md:size-[200px] ">
          <Image
            className="relative z-10 bg-blend-overlay"
            src={"/images/foodts.png"}
            width={600}
            height={600}
            alt="Picture of the author"
          />
        </div>
        <div className="animation flex max-w-[550px] flex-col justify-center gap-5 max-md:items-center max-md:text-center ">
          <h5 className="flex gap-4 text-[20px] font-semibold max-md:text-base ">
            <span className="font-bold text-emerald-500 underline underline-offset-4 ">
              100%
            </span>
            Organic Fruits
          </h5>
          <h1 className="text-[34px] font-bold max-md:text-2xl max-sm:text-lg">
            Explore fresh &amp; juicy fruits.
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            reiciendis beatae consequuntur.
          </p>
          <Link href={Routes.shop.path}>
            <Button className="mt-4 bg-emerald-500">Shop now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function View() {
  return (
    <>
      {/* welcome section */}
      <WelcomeSection />
      {/* category cards horizontal */}
      <CategoryCards />
      {/* featured products tab, left sidebar, 4x2 grid */}
      <FeaturedProductsSection />
      {/* discount grid, 3 col */}
      <DiscountSlider />
      {/* perks, 4 col icon box */}
      <OfferingsCards />
    </>
  );
}
