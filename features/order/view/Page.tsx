import { FormErrorMessage } from "../../../components/FormMessage"
import { PageTitle } from "@/components/header/PageTitle"
import { Breadcrumb } from "@/components/header/header"
// import { Form, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Fragment } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
})

export type IFormSchema = z.infer<typeof formSchema>

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
    name: "zip",
    label: "Zip",
    type: "text",
    placeholder: "Your zip",
  },
]

function UserAddressForm() {
  const form = useForm<IFormSchema>({
    resolver: zodResolver(formSchema),
  })
  function onSubmit(data: IFormSchema) {
    console.log(data)
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3  grid gap-10 "
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
  return (
    <div className="mx-auto w-full">
      <Breadcrumb />
      <PageTitle />
      <div className="mt-20">
        <div className="flex max-w-[1500px] w-full mx-auto  justify-between gap-10">
          <UserAddressForm />
        </div>
      </div>
    </div>
  )
}
