import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/utils/api";
import { type Product } from "@prisma/client";
import Image from "next/image";

function useProductQueries() {
  const query = api.product.getAll.useQuery();
  const generate = api.product.generate.useMutation({
    onSuccess: async () => {
      await query.refetch();
    },
  });
  const deleteAll = api.product.deleteAll.useMutation({
    onSuccess: async () => {
      await query.refetch();
    },
  });

  return { query, generate, deleteAll };
}

function ListItem({ item }: { item: Product }) {
  return (
    <>
      <Card className="p-4">
        <div className="relative h-[200px]">
          <Image
            src={item.image}
            fill
            alt=""
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <span>{item.title}</span>
      </Card>
    </>
  );
}

function List() {
  const { query } = useProductQueries();

  if (query.error) {
    return <div>Error: {query.error.message}</div>;
  }

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (!query.data.length) {
    return (
      <>
        <div>No products found</div>
        <div>Click the button to generate some fake products</div>
      </>
    );
  }

  return (
    <div className="grid w-full grid-cols-4 gap-4">
      {query.data.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function Generate() {
  const { generate } = useProductQueries();
  return (
    <Button
      disabled={generate.isLoading}
      onClick={() =>
        generate.mutate({
          category: "fruit",
        })
      }
    >
      Generate fake products
    </Button>
  );
}

export default function Page() {
  const { deleteAll } = useProductQueries();

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <Generate />
        <Button
          disabled={deleteAll.isLoading}
          onClick={() => deleteAll.mutate()}
          className="bg-red-500"
        >
          deleteAll
        </Button>
      </div>
      <List />
    </>
  );
}
