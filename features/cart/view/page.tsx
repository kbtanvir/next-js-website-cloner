import { PageTitle } from "@/components/PageTitle"
import { Breadcrumb } from "@/components/header"
import { useEffect } from "react"
import { api } from "~/utils/api"

function ListGrid() {
  const mutation = api.cart.update.useMutation()
  const query = api.cart.listProductsInCart.useQuery({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        await query.refetch()
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    void fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(mutation.data)])

  // useEffect(() => {
  //   console.log(countsQuery.data)
  //   globalStore.setProductCounts({ ...countsQuery.data })
  // }, [])

  if (query.error) {
    return <div>{query.error.message}</div>
  }

  if (query.isLoading) {
    return <div>Loading...</div>
  }

  if (!query.data?.cartItems) {
    return <div>No data</div>
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-5">
            <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
            <div className="flex flex-col">
              <div className="text-lg font-semibold">Product name</div>
              <div className="text-sm text-gray-500">Product description</div>
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <div className="text-lg font-semibold">Price</div>
            <div className="text-lg font-semibold">Quantity</div>
            <div className="text-lg font-semibold">Total</div>
          </div>
        </div>
        {query.data.cartItems?.map((p) => (
          <div
            key={p.id}
            className="flex flex-row justify-between items-center mt-5"
          >
            <div className="flex flex-row gap-5">
              <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
              <div className="flex flex-col">
                <div className="text-lg font-semibold">{p.title}</div>
                <div className="text-sm text-gray-500">{p.description}</div>
                {/* add button, quanty, remove button */}
                <button
                  onClick={() => {
                    mutation.mutate({
                      productId: p.productId,
                      quantity: 4,
                      action: "update",
                    })
                  }}
                >
                  +
                </button>
                <div className="text-lg font-semibold">{p.quantity}</div>
                <button
                  onClick={() => {
                    mutation.mutate({
                      productId: 1,
                      quantity: 1,
                    })
                  }}
                >
                  -
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-5">
              <div className="text-lg font-semibold">{p.price}</div>
              <div className="text-lg font-semibold">{p.quantity}</div>
              <div className="text-lg font-semibold">{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export function PageView() {
  return (
    <span className="mx-auto w-full">
      <Breadcrumb />
      <PageTitle />
      <div className="mt-20">
        <div className="flex max-w-[1500px] w-full mx-auto  justify-between gap-10">
          <ListGrid />
        </div>
      </div>
    </span>
  )
}
