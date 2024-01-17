import { Button } from "../ui/button"
import { ProductsQueryInput, type IProductQueryInput } from "./index"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export function KBForm() {
  // * FORM SERVICE
  const formService = useForm<IProductQueryInput>({
    mode: "onChange",
    resolver: zodResolver(ProductsQueryInput),
  })
  function onSubmit(dto: IProductQueryInput) {
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
