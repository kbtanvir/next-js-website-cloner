import { FormErrorMessage } from "../../../components/FormMessage"
import { Button } from "@/components/ui/button"
// import { Form, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCartStore } from "@/features/cart/controller/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Fragment, useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import SignInPage from "~/pages/signin"
import { api } from "~/utils/api"

export const PaymentMethodEnum = {
  COD: "cod",
  CREDIT_CARD: "credit_card",
}

export const checkoutFormSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  state: z.string(),
  zipcode: z.string(),
  paymentMethod: z.nativeEnum(PaymentMethodEnum),
})

export type ICheckoutForm = z.infer<typeof checkoutFormSchema>

type IFormFields = ({
  name: keyof ICheckoutForm
} & {
  [key: string]: any
})[]

function UserAddressForm() {
  const { cart } = useCartStore()
  const mutation = api.order.createOrder.useMutation()
  const form = useForm<ICheckoutForm>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      // paymentMethod: PaymentMethodEnum.COD,
    },
  })
  const addressFields: IFormFields = [
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

  function onSubmit(data: ICheckoutForm) {
    mutation.mutate({
      data,
      items: cart.map((item) => ({
        id: item.id,
        qty: item.qty,
        price: item.product.price,
      })),
    })
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid gap-20 "
      >
        {Object.entries(form.formState.errors).length !== 0 &&
          JSON.stringify(form.formState.errors)}

        <div className="grid gap-10">
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
          <div className="grid grid-cols-2 gap-10 items-start">
            {addressFields.map((row, i) => (
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
                    required
                  />
                  <FormErrorMessage name={row.name} />
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="grid gap-10">
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
          {/* payment method radio group */}

          <RadioGroup
            defaultValue={PaymentMethodEnum.COD}
            className="grid gap-5"
            onValueChange={(value) => {
              console.log(value)
              form.setValue("paymentMethod", value)
            }}
            name="paymentMethod"
          >
            {Object.entries({
              [PaymentMethodEnum.COD]: "Cash on delivery",
              [PaymentMethodEnum.CREDIT_CARD]: "Credit card",
            }).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center space-x-2 bg-gray-50 p-5 rounded-lg"
              >
                <RadioGroupItem value={key} id={key} />
                <Label htmlFor={key} className="text-lg cursor-pointer">
                  {value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        {/* credit card fields */}
        {form.watch("paymentMethod") === PaymentMethodEnum.CREDIT_CARD && (
          <div className="grid gap-10">
            <div className="">
              <div className="text-2xl font-semibold uppercase leading-8 text-zinc-800">
                Credit card
              </div>
              <div className="mt-5">
                <div className="text-sm leading-5 text-zinc-600">
                  Please enter your credit card details
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 items-start">
              <div className="grid gap-5 items-start">
                <label
                  htmlFor="cardNumber"
                  className="text-sm font-medium leading-none"
                >
                  Card number
                </label>
                <Input
                  name="cardNumber"
                  type="text"
                  placeholder="Your card number"
                />
              </div>
              <div className="grid gap-5 items-start">
                <label
                  htmlFor="cardName"
                  className="text-sm font-medium leading-none"
                >
                  Card name
                </label>
                <Input
                  name="cardName"
                  type="text"
                  placeholder="Your card name"
                />
              </div>
              <div className="grid gap-5 items-start">
                <label
                  htmlFor="cardExpiry"
                  className="text-sm font-medium leading-none"
                >
                  Card expiry
                </label>
                <Input
                  name="cardExpiry"
                  type="text"
                  placeholder="Your card expiry"
                />
              </div>
              <div className="grid gap-5 items-start">
                <label
                  htmlFor="cardCvc"
                  className="text-sm font-medium leading-none"
                >
                  Card CVC
                </label>
                <Input name="cardCvc" type="text" placeholder="Your card CVC" />
              </div>
            </div>
          </div>
        )}
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
    <div className="max-w-[800px] w-full mx-auto ">
      <div className="mt-20">
        <div className="flex gap-20">
          <div className="grid flex-1 ">
            {sessionData ? <UserAddressForm /> : <SignInPage />}
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
            {sessionData && (
              <Link className="self-end" href="/checkout">
                <Button className="bg-black text-base px-10 py-5 h-12 text-white">
                  Checkout
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
