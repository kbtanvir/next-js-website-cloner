import { z } from "zod";

export const ExampleFilterValidations = z.object({
  name: z.string().optional(),
  location: z.string().optional(),
});

export const ExampleValidations = {
  getAll: z.object({
    filters: ExampleFilterValidations,
    limit: z.number().optional(),
    offset: z.number().optional(),
  }),
  writeOne: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
  getOne: z.object({
    id: z.string(),
  }),
  deleteOne: z.object({
    id: z.string(),
  }),
  deleteAll: z.object({
    ids: z.array(z.string()),
  }),
};

export type ExampleGetAllDTO = z.infer<typeof ExampleValidations.getAll>;
export type ExampleWriteOneDTO = z.infer<typeof ExampleValidations.writeOne>;
export type ExampleGetOneDTO = z.infer<typeof ExampleValidations.getOne>;
export type ExampleDeleteOneDTO = z.infer<typeof ExampleValidations.deleteOne>;
export type ExampleDeleteAllDTO = z.infer<typeof ExampleValidations.deleteAll>;
