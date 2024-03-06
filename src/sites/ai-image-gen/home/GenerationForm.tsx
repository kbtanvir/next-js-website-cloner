import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormErrorMessage } from "@/components/FormMessage";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { PrimaryButton } from ".";

const FormSchema = z.object({
  prompt: z.string().min(3).max(255),
  negativePrompt: z.string().min(3).max(255).optional(),
  model: z.string().min(3).max(255).optional(),
  size: z.string().min(3).max(255).optional(),
});

type IFormSchema = z.infer<typeof FormSchema>;
type IFormFields = {
  name: keyof IFormSchema;
  label: string;
  type: "text" | "selection";
  placeholder: string;
  options?: Record<string, Record<string, string>>;
}[];
const fields: IFormFields = [
  {
    name: "prompt",
    label: "Full name",
    type: "text",
    placeholder: "Describe what you want or hit a tag below",
  },
  {
    name: "model",
    label: "Model (Optional)",
    type: "selection",
    placeholder: "Enter a model name",
    options: {
      "AI Models": {
        "DALL-E-2": "DALL-E-2",
        "DALL-E-3": "DALL-E-3",
      },
      "Stable Diffusion Models": {
        "Stable Diffusion 1.5": "Stable Diffusion 1.5",
        "Stable Diffusion 2.1": "Stable Diffusion 2.1",
        MidJourney: "MidJourney",
        "Realistic Vision V1.3": "Realistic Vision V1.3",
        "Dream Shaper": "Dream Shaper",
        "Protogen x3.4": "Protogen x3.4",
        F222: "F222",
        "Portrait+": "Portrait+",
        "GTA5 Artwork Diffusion": "GTA5 Artwork Diffusion",
        "Wifu Diffusion": "Wifu Diffusion",
      },
    } as const,
  },
  {
    name: "negativePrompt",
    label: "Negative Prompt (Optional)",
    type: "text",
    placeholder: "Describe what you don't want",
  },

  {
    name: "size",
    label: "Size (Optional)",
    type: "selection",
    placeholder: "Enter a size",
    options: {
      Sizes: {
        "256x256": "256x256",
        "512x512": "512x512",
        "1024x1024": "1024x1024",
        "2048x2048": "2048x2048",
      },
    },
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
          className="grid w-full grid-cols-1 items-end gap-5 max-md:flex max-md:grid-cols-1 max-md:flex-col max-md:items-stretch"
        >
          {fields.map((row, i) => (
            <Fragment key={i}>
              <div className="grid gap-3 ">
                <label
                  htmlFor={row.name}
                  className="text-left text-sm font-medium leading-none"
                >
                  {row.label}
                </label>
                {row.type === "text" && (
                  <Input
                    {...row}
                    className="text-black"
                    onChange={(e) => form.setValue(row.name, e.target.value)}
                    value={form.watch(row.name) ?? ""}
                    required
                  />
                )}
                {row.type === "selection" && (
                  <Select
                    onValueChange={(value) => form.setValue(row.name, value)}
                    defaultValue={form.watch(row.name) ?? ""}
                  >
                    <SelectTrigger className="text-black">
                      <SelectValue placeholder={row.placeholder} />
                    </SelectTrigger>

                    {row.options && (
                      <SelectContent className="">
                        {Object.entries(row.options).map(([label, options]) => (
                          <SelectGroup key={label}>
                            <SelectLabel className="px-4">{label}</SelectLabel>
                            {Object.entries(options).map(([value, label]) => (
                              <SelectItem
                                key={value}
                                value={value}
                                className="px-4"
                              >
                                {label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    )}
                  </Select>
                )}

                <FormErrorMessage name={row.name} />
              </div>
            </Fragment>
          ))}
          <div className="col-span-2">
            <PrimaryButton className="w-full">Generate</PrimaryButton>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
