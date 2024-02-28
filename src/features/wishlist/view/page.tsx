import { PageTitle } from "@/components/header/PageTitle";
import { Button } from "@/components/ui/button";
import { type IProduct } from "@/features/shop/model";
import { ProductItem } from "@/features/shop/view/ProductItem";
import { api } from "@/utils/api";
import { useGlobalStore } from "@/utils/global.store";
import { type Product } from "@prisma/client";
import { useEffect, useState } from "react";

function ProductGrid() {
  const [data, setData] = useState<Product[]>([]);

  const { productsQueryDTO, columnSize } = useGlobalStore();
  const infiniteQuery = api.product.infiniteProducts.useInfiniteQuery(
    { ...productsQueryDTO, wishlist: true },
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
    const data = (infiniteQuery.data?.pages
      .map((page) => page.products)
      .flat() ?? []) as Product[];
    setData(data);
    console.log(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infiniteQuery.data]);

  if (infiniteQuery.error) {
    return <div>{infiniteQuery.error.message}</div>;
  }

  if (infiniteQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (!infiniteQuery.data) {
    return <div>No data</div>;
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <div
        className={`grid w-full gap-8`}
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(250px, 250px))`,
        }}
      >
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

export function PageView() {
  return (
    <span className="mx-auto w-full">
      <PageTitle />
      <div className="mt-20">
        <div className="mx-auto flex w-full max-w-[1500px]  justify-between gap-10">
          <ProductGrid />
        </div>
      </div>
    </span>
  );
}
