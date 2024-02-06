import { type Prisma } from "@prisma/client"
import * as z from "zod"

export const ProductSizes = ["S", "L", "M", "XL"] as const

export type IProductSize = (typeof ProductSizes)[number]

export const OrderByOptions = [
  "price_asc",
  "price_desc",
  "createdAt_asc",
  "createdAt_desc",
] as const

export type IOrderBy = (typeof OrderByOptions)[number]

export const productsQueryInput = z.object({
  categories: z.string().array().optional(),
  limit: z.number().min(10).optional(),
  cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
  inStock: z.boolean().optional(),
  price: z
    .object({
      gte: z.coerce.number().min(0).optional(),
      lte: z.coerce.number().min(10).optional(),
    })
    .optional(),
  sizes: z.enum(ProductSizes).array().optional(),
  sort: z.enum(OrderByOptions).optional(),
  OR: z.any().optional(),
  wishlist: z.any().optional(),
})

export type IProductQueryInput = z.infer<typeof productsQueryInput>

export type IProduct = Prisma.ProductGetPayload<{
  include: {
    sizes: true
    wishlist: true
    cart: true
    categories: true
  }
}>
export type CreateProductDTO = Partial<IProduct>
