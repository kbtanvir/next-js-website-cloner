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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { PrimaryButton } from ".";

export const FormSchema = z.object({
  image: z.string().min(3).max(255),
  model: z.string().min(3).max(255).optional(),
  scaleFactor: z.string().min(0).max(255).optional(),
});

type IFormSchema = z.infer<typeof FormSchema>;
type IFormFields = {
  name: keyof IFormSchema;
  label: string;
  type: "text" | "selection" | "file" | "number";
  placeholder: string;
  options?: Record<string, Record<string, string>>;
}[];
const fields: IFormFields = [
  {
    name: "image",
    label: "Image",
    type: "file",
    placeholder: "Enter an image URL",
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
    name: "scaleFactor",
    label: "Scale Factor",
    type: "number",
    placeholder: "Enter a scale factor",
  },
];

export function UpscaleForm() {
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
          className="grid w-full grid-cols-2 items-end gap-5 max-md:grid-cols-1"
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
                  <>
                    <Select
                      onValueChange={(value) => form.setValue(row.name, value)}
                      defaultValue={form.watch(row.name) ?? ""}
                    >
                      <SelectTrigger className="text-black">
                        <SelectValue placeholder={row.placeholder} />
                      </SelectTrigger>

                      {row.options && (
                        <SelectContent className="">
                          {Object.entries(row.options).map(
                            ([label, options]) => (
                              <SelectGroup key={label}>
                                <SelectLabel className="px-4">
                                  {label}
                                </SelectLabel>
                                {Object.entries(options).map(
                                  ([value, label]) => (
                                    <SelectItem
                                      key={value}
                                      value={value}
                                      className="px-4"
                                    >
                                      {label}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectGroup>
                            ),
                          )}
                        </SelectContent>
                      )}
                    </Select>
                  </>
                )}

                {row.type === "file" && (
                  <Input
                    {...row}
                    type="file"
                    className="text-black"
                    onChange={(e) => form.setValue(row.name, e.target.value)}
                    value={form.watch(row.name) ?? ""}
                    required
                  />
                )}

                {row.type === "number" && (
                  <Input
                    {...row}
                    type="number"
                    min={2}
                    className="text-black"
                    onChange={(e) => form.setValue(row.name, e.target.value)}
                    value={form.watch(row.name) ?? ""}
                    required
                  />
                )}

                <FormErrorMessage name={row.name} />
              </div>
            </Fragment>
          ))}
          <PrimaryButton className="h-[41px] w-full">Generate</PrimaryButton>
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
