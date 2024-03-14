import { Button } from "@/components/ui/button";
import { Sidebar } from "@/features/shop/view/sidebar";
import { PageTitle } from "@/sites/ecommerce/header/PageTitle";
import { type Product } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TbMoodEmpty } from "react-icons/tb";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { api } from "@/utils/api";
import { globalStore, useGlobalStore } from "@/utils/global.store";
import { type IProduct } from "../model";
import { ProductItem } from "./ProductItem";

function ProductGrid() {
  const [data, setData] = useState<Product[]>([]);

  const router = useRouter();
  
  const { productsQueryDTO } = useGlobalStore();
  const infiniteQuery = api.product.infiniteProducts.useInfiniteQuery(
    productsQueryDTO,
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await infiniteQuery.refetch();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(productsQueryDTO)]);

  useEffect(() => {
    const data =
      infiniteQuery.data?.pages.map((page) => page.products).flat() ?? [];
    setData(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infiniteQuery.data]);

  useEffect(() => {
    const { category } = router.query;
    const categories = category ? [category as string] : undefined;

    return globalStore.setProductsQueryDTO({
      ...productsQueryDTO,
      categories,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  if (infiniteQuery.error) {
    return <div>{infiniteQuery.error.message}</div>;
  }

  if (infiniteQuery.isLoading) {
    return (
      <div className="grid w-full grid-cols-3 gap-10 max-md:grid-cols-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-full">
            <Skeleton count={1} height="300px" />
          </div>
        ))}
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex-center min-h-[400px] w-full flex-col self-start rounded-lg bg-gray-50  ">
        <TbMoodEmpty className="text-[80px]  text-slate-300" />

        <h3 className="text-[40px]  text-slate-300">We ran out of stock</h3>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <div className={`grid w-full grid-cols-3 gap-4 max-[1100px]:grid-cols-2`}>
        {data.map((item) => (
          <ProductItem
            key={item.id}
            item={item as IProduct}
            refetch={infiniteQuery.refetch}
          />
        ))}
      </div>
      {infiniteQuery.hasNextPage && (
        <Button
          className="self-start"
          onClick={async () => {
            await infiniteQuery.fetchNextPage();
          }}
        >
          Loadmore
        </Button>
      )}
      {/* TODO: add pagination */}
    </div>
  );
}
function Pagination() {
  return (
    <span className="mt-20 flex w-full  gap-5 self-start max-md:mt-10">
      {[1, 2, 3, 4].map((_, i) => (
        <span className="flex-center aspect-square w-10 bg-slate-100" key={i}>
          {_}
        </span>
      ))}
    </span>
  );
}

export function useMediaQuery({ max = "769px" }) {
  const [query, setQuery] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${max})`);
    setQuery(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setQuery(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [max]);

  return query;
}
export function PageContent() {
  const { showSidebar } = useGlobalStore();

  const mobileScreen = useMediaQuery({ max: "769px" });

  useEffect(() => {
    if (mobileScreen) {
      globalStore.setShowSidebar(false);
    } else {
      globalStore.setShowSidebar(true);
    }
  }, [mobileScreen]);

  return (
    <div className="">
      <PageTitle />
      <div className="section-box-w section-px section-py mx-auto flex w-full justify-between gap-10">
        {showSidebar && (
          <div
            className={`static h-full w-full max-w-[280px] bg-white ${
              showSidebar &&
              "fixed left-0  top-0 z-50 items-stretch overflow-y-auto max-[769px]:p-5 min-[769px]:sticky"
            }`}
          >
            <Sidebar />
          </div>
        )}
        <ProductGrid />
      </div>
    </div>
  );
}
