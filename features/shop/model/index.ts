import { type Prisma, type Product } from "@prisma/client"
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

export const ProductsQueryInput = z.object({
  category: z.string().optional(),
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
})

export type IProductQueryInput = z.infer<typeof ProductsQueryInput>

export type IProduct = Prisma.ProductGetPayload<{
  include: {
    sizes: true
    // wishlist: true
  }
}>
export type CreateProductDTO = Pick<
  Product,
  "title" | "description" | "image" | "inStock" | "userId" | "price" | "id"
>
