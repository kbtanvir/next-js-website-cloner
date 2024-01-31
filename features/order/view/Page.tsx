import { FormErrorMessage } from "../../../components/FormMessage"
import { Button } from "@/components/ui/button"
// import { Form, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/features/cart/controller/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Fragment, useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import SignInPage from "~/pages/signin"
import { api } from "~/utils/api"

export const userAddressFormSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  state: z.string(),
  zipcode: z.string(),
})

export type IFormSchema = z.infer<typeof userAddressFormSchema>

type IFormFields = ({
  name: keyof IFormSchema
} & {
  [key: string]: any
})[]

const formFields: IFormFields = [
  {
    name: "name",
    label: "Full name",
    type: "text",
    placeholder: "Your full name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Your email",
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Your phone",
  },

  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Your address",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "Your city",
  },
  {
    name: "state",
    label: "State",
    type: "text",
    placeholder: "Your state",
  },
  {
    name: "zipcode",
    label: "Zip",
    type: "text",
    placeholder: "Your zip",
  },

  {
    name: "country",
    label: "Country",
    type: "text",
    placeholder: "Your country",
  },
]

function UserAddressForm() {
  const { cart, total } = useCartStore()
  const mutation = api.order.createOrder.useMutation()
  const form = useForm<IFormSchema>({
    resolver: zodResolver(userAddressFormSchema),
  })
  function onSubmit(userAddress: IFormSchema) {
    mutation.mutate({
      total,
      userAddress,
      items: cart.map((item) => ({
        id: item.id,
        qty: item.qty,
        price: item.product.price,
        status: "pending",
      })),
    })
  }

  return (
    <FormProvider {...form}>
      <div className="">
        <div className="text-2xl font-semibold uppercase leading-8 text-zinc-800">
          Shipping address
        </div>
        <div className="mt-5">
          <div className="text-sm leading-5 text-zinc-600">
            Please enter your shipping address
          </div>
        </div>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full  grid gap-10 "
      >
        <div className="grid grid-cols-2 gap-10 items-start">
          {formFields.map((row, i) => (
            <Fragment key={i}>
              <div className="grid gap-5 items-start">
                <label
                  htmlFor={row.name}
                  className="text-sm font-medium leading-none"
                >
                  {row.label}
                </label>
                <Input
                  {...row}
                  onChange={(e) => form.setValue(row.name, e.target.value)}
                  value={form.watch(row.name) ?? ""}
                  className=""
                  required
                />
                <FormErrorMessage name={row.name} />
              </div>
            </Fragment>
          ))}
        </div>
        <div className="flex  w-full">
          <button
            type="submit"
            className="bg-black text-white px-10 py-3 rounded-md"
          >
            Place order
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

export function PageView() {
  const { data: sessionData } = useSession()

  const cstate = useCartStore()

  const [total, setcState] = useState<number>(0)

  useEffect(() => {
    setcState(cstate.total)
  }, [cstate])
  return (
    <div className="max-w-[1000px] w-full mx-auto ">
      <div className="mt-20">
        <div className="flex gap-10">
          <div className="grid flex-1 justify-between gap-10">
            {sessionData ? (
              <>
                <UserAddressForm />
              </>
            ) : (
              <>
                <SignInPage />
              </>
            )}
          </div>
          <div
            className="max-w-[300px] w-full self-start bg-gray-100 
      grid p-5 rounded-lg gap-5"
          >
            <div className="grid grid-cols-2 w-full bg-gray-200 p-5 rounded-lg">
              <span className="text-base ">Subtotal</span>
              <span className="text-base  justify-self-end">${total}</span>
            </div>
            <div className="grid grid-cols-2 w-full bg-gray-200 p-5 rounded-lg">
              <span className="text-base ">Shipping</span>
              <span className="text-base  justify-self-end">${0}</span>
            </div>
            <div className="grid grid-cols-2 w-full bg-gray-200 p-5 rounded-lg">
              <span className="text-base font-bold">Total</span>
              <span className="text-base font-bold justify-self-end">
                ${total}
              </span>
            </div>
            <Link className="self-end" href="/checkout">
              <Button className="bg-black text-base px-10 py-5 h-12 text-white">
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
