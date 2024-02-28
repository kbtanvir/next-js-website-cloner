import { z } from "zod";

export const ResourceInputSchema = {
  writeOneFake: z.object({
    l1: z.string().optional(),
    l1Id: z.string().optional(),
    l2: z.string().optional(),
    l2Id: z.string().optional(),
    l3: z.string().optional(),
    l3Id: z.string().optional(),
  }),
  getOne: z.object({
    id: z.string(),
  }),
  getAll: z.object({
    name: z.string(),
    l1: z.string().optional(),
    l2: z.string().optional(),
    l3: z.string().optional(),
    location: z.string().optional(),
  }),
};

export type ResourceGetAllDTO = z.infer<typeof ResourceInputSchema.getAll>;

export type ResourceWriteOneDTO = z.infer<
  typeof ResourceInputSchema.writeOneFake
>;

export const CategoryInputSchema = {
  getAll: z.object({
    level: z.number().optional(),
  }),
};

export type CategoryGetAllPayload = z.infer<typeof CategoryInputSchema.getAll>;

export const LocationInputSchema = {
  getAll: z.object({
    text: z.string(),
  }),
};

export type LocationGetAllPayload = z.infer<typeof LocationInputSchema.getAll>;
