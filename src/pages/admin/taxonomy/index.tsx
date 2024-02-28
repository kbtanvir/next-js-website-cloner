import { api } from "@/utils/api";

export default function Page() {
  const query = api.taxonomy.getAll.useQuery({});
  // const mutation = api.user.updateOne.useMutation({
  //   onSuccess: () => refetch(),
  // });
  if (query.error) {
    return <div>Error: {query.error.message}</div>;
  }

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if(query.data.length === 0) {
    return <div>No data</div>
  }

  return (
    <>
      <div className="grid w-full max-w-[500px] grid-cols-3 gap-4">
        {query.data?.map((item) => (
          <div className="" key={item.id}>
            {item.name}
          </div>
        ))}
      </div>
    </>
  );
}
