import { Button } from "../ui/button"
import { ISidebarFormSchema, SidebarFormSchema } from "./index"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export function KBForm() {
  // * FORM SERVICE
  const formService = useForm<ISidebarFormSchema>({
    mode: "onChange",
    resolver: zodResolver(SidebarFormSchema),
  })
  function onSubmit(dto: ISidebarFormSchema) {
    console.log(dto)
  }

  return (
    <div>
      <Form {...formService}>
        <form onSubmit={formService.handleSubmit(onSubmit)}>
          <Input
            type={"number"}
            name="minPrice"
            onChange={(e) => {
              console.log(e.target.value)
              formService.setValue("minPrice", parseFloat(e.target.value))
            }}
            value={formService.watch("minPrice")}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
