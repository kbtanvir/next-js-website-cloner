import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Product } from "@prisma/client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const FormSchema = z.object({
  category: z.string().min(3).max(255),
});
type IFormSchema = z.infer<typeof FormSchema>;

function Generate() {
  const { generate } = useProductQueries();
  const form = useForm<IFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });
  function onSubmit(data: IFormSchema) {
    generate.mutate({
      category: data.category,
    });
  }
  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full grid-cols-2 items-end gap-5 max-md:grid-cols-1"
      >
        <Input
          name="category"
          className="text-black"
          onChange={(e) => form.setValue("category", e.target.value)}
          value={form.watch("category") ?? ""}
          required
        />
        <Button disabled={generate.isLoading} type="submit">
          Generate fake products
        </Button>
      </form>
    </>
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
