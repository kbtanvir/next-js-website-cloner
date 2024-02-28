import { z } from "zod";

 
export const UserValidations = {
  getAll: z.object({
    // filters: UserFilters,
    // limit: z.number().optional(),
    // offset: z.number().optional(),
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

export type UserGetAllDTO = z.infer<typeof UserValidations.getAll>;
export type UserWriteOneDTO = z.infer<typeof UserValidations.writeOne>;
export type UserGetOneDTO = z.infer<typeof UserValidations.getOne>;
export type UserDeleteOneDTO = z.infer<typeof UserValidations.deleteOne>;
export type UserDeleteAllDTO = z.infer<typeof UserValidations.deleteAll>;



export const TaxonomyValidations = {
  getAll: z.object({
    // filters: TaxonomyFilters,
    // limit: z.number().optional(),
    // offset: z.number().optional(),
  }),
  writeOne: z.object({
    name: z.string(),
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

export type TaxonomyGetAllDTO = z.infer<typeof TaxonomyValidations.getAll>;
export type TaxonomyWriteOneDTO = z.infer<typeof TaxonomyValidations.writeOne>;
export type TaxonomyGetOneDTO = z.infer<typeof TaxonomyValidations.getOne>;
export type TaxonomyDeleteOneDTO = z.infer<typeof TaxonomyValidations.deleteOne>;
export type TaxonomyDeleteAllDTO = z.infer<typeof TaxonomyValidations.deleteAll>;
