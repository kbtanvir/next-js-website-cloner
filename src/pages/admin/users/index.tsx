import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { type User } from "@prisma/client";

export default function Page() {
  const query = api.user.getAll.useQuery({});

  if (query.error) {
    return <div>Error: {query.error.message}</div>;
  }

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid w-full max-w-[500px] grid-cols-3 gap-4">
        {query.data?.map((user) => (
          <ListItem refetch={query.refetch} key={user.id} item={user} />
        ))}
      </div>
    </>
  );
}

function ListItem({ item, refetch }: { item: User; refetch: () => void }) {
  // const mutation = api.user.updateOne.useMutation({
  //   onSuccess: () => refetch(),
  // });
  return (
    <>
      <span className="col-span-2">{item.email}</span>
      {/* <Button
        className="justify-self-end"
        onClick={() => {
          mutation.mutate({
            email: item.email,
            isBlocked: !item.isBlocked,
          });
        }}
      >
        {item.isBlocked ? "Blocked" : "Active"}
      </Button> */}
    </>
  );
}
