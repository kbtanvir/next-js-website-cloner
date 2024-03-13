import { FormErrorMessage } from "@/components/FormMessage";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../components/input";
import { Textarea } from "../components/textarea";
import { PrimaryButton } from "../theme";

const FormSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().min(3).max(255).optional(),
  message: z.string().min(3).max(255).optional(),
});

type IFormSchema = z.infer<typeof FormSchema>;
type IFormFields = {
  name: keyof IFormSchema;
  label: string;
  type: "text" | "selection" | "textarea" | "email";
  placeholder: string;
  options?: Record<string, Record<string, string>>;
  span?: number;
}[];
const fields: IFormFields = [
  {
    name: "name",
    label: "Full name",
    type: "text",
    placeholder: "Enter your full name",
  },

  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },

  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Enter your message",
    span: 2,
  },
];

export function Contactform() {
  const form = useForm<IFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });
  function onSubmit(data: IFormSchema) {
    console.log(data);
  }

  return (
    <FormProvider {...form}>
      <div className="grid w-full gap-10">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full grid-cols-2 items-end gap-x-8 gap-y-10 max-md:flex max-md:grid-cols-1 max-md:flex-col max-md:items-stretch"
        >
          {fields.map((row, i) => (
            <div key={i} className={cn(`grid gap-3 col-span-${row.span}`)}>
              <label
                htmlFor={row.name}
                className="text-left text-sm font-medium leading-none"
              >
                {row.label}
              </label>
              {/* text, email */}
              {(row.type === "text" || row.type === "email") && (
                <Input
                  {...row}
                  className=""
                  onChange={(e) => form.setValue(row.name, e.target.value)}
                  value={form.watch(row.name) ?? ""}
                  required
                />
              )}
              {/* textarea */}
              {row.type === "textarea" && (
                <Textarea
                  {...row}
                  className="col-span-2"
                  onChange={(e) => form.setValue(row.name, e.target.value)}
                  value={form.watch(row.name) ?? ""}
                  required
                />
              )}

              <FormErrorMessage name={row.name} />
            </div>
          ))}
          <div className="flex-center col-span-2   ">
            <PrimaryButton className=" self-center">Send message</PrimaryButton>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
