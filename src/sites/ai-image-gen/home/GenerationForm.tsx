import { FormErrorMessage } from "@/components/FormMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export const FormSchema = z.object({
  prompt: z.string().min(3).max(255),
  negativePrompt: z.string().min(3).max(255).optional(),
  model: z.string().min(3).max(255).optional(),
  size: z.string().min(3).max(255).optional(),
});

type IFormSchema = z.infer<typeof FormSchema>;

type IFormFields = ({
  name: keyof IFormSchema;
} & Record<string, any>)[];

const fields: IFormFields = [
  {
    name: "prompt",
    label: "Full name",
    type: "text",
    placeholder: "Describe what you want or hit a tag below",
  },
  {
    name: "negativePrompt",
    label: "Negative Prompt (Optional)",
    type: "text",
    placeholder: "Describe what you don't want",
  },
  {
    name: "model",
    label: "Model (Optional)",
    type: "selection",
    placeholder: "Enter a model name",
  },
  {
    name: "size",
    label: "Size (Optional)",
    type: "selection",
    placeholder: "Enter a size",
  },
];

export function GenerationForm() {
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
          className="grid w-full grid-cols-2 gap-5"
        >
          {fields.map((row, i) => (
            <Fragment key={i}>
              <div className="grid gap-3">
                <label
                  htmlFor={row.name}
                  className="text-left text-sm font-medium leading-none"
                >
                  {row.label}
                </label>
                <Input
                  {...row}
                  className="text-black"
                  onChange={(e) => form.setValue(row.name, e.target.value)}
                  value={form.watch(row.name) ?? ""}
                  required
                />
                <FormErrorMessage name={row.name} />
              </div>
            </Fragment>
          ))}
        </form>
        {/* Tags */}
        <div className="flex flex-wrap items-center justify-center gap-10">
          <span className="text-white">Popular Tags</span>
          <div className="flex gap-2">
            {["House", "Apartment", "Villa", "Office"].map((tag, i) => (
              <Button
                key={i}
                size={"sm"}
                className=" bg-black/30 px-4 text-[10px]  text-white"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
