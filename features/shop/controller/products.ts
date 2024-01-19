/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { ProductsQueryInput } from "@/features/shop/model"
import { faker } from "@faker-js/faker"
import { type Prisma, type Product } from "@prisma/client"
import { type inferAsyncReturnType } from "@trpc/server"
import {
  createTRPCRouter,
  publicProcedure,
  type createTRPCContext,
} from "~/server/api/trpc"

export const productRouter = createTRPCRouter({
  infiniteProducts: publicProcedure
    .input(ProductsQueryInput)
    .query(async ({ input, ctx }) => {
      const whereClause: any = {}

      if (input.inStock) {
        whereClause.inStock = true
      }

      if (input.sizes?.length) {
        whereClause["OR"] = [] as any[]
        const sizes = input.sizes.map((size) => ({
          sizes: {
            some: {
              name: size,
            },
          },
        }))
        whereClause["OR"] = [...sizes]
      }

      if (input.price) {
        whereClause.price = input.price
      }

      // if (input.category !== undefined) {
      //   whereClause.category = input.category
      // }

      if (!input.limit) {
        input.limit = 10
      }

      const data = await ctx.prisma.product.findMany({
        take: input.limit ? input.limit + 1 : undefined,
        cursor: input.cursor ? { createdAt_id: input.cursor } : undefined,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        where: whereClause,
        include: {
          user: true,
          sizes: true,
        },
      })

      let nextCursor: typeof input.cursor | undefined

      if (data.length > (input.limit ?? 10)) {
        const nextItem = data.pop()
        if (nextItem != null) {
          nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt }
        }
      }
      console.log(data)

      return {
        products: data.map((product) => {
          return {
            ...product,
          }
        }),
        nextCursor,
      }
    }),
  deleteAllProducts: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.product.deleteMany()

    return true
  }),
  addFake100: publicProcedure.mutation(async ({ ctx }) => {
    const userID = ctx.session?.user.id

    if (userID == null) {
      throw new Error("You must be logged in to do this")
    }

    // Create new products without sizes
    const PRODUCTS = Array.from({ length: 10 }).map(() =>
      createRandomProducts(userID)
    )

    // Use bulk promise to update all products with sizes
    const updatePromises = PRODUCTS.map((productData) =>
      addSizesToProducts(ctx, userID, productData)
    )
    await Promise.all(updatePromises)
  }),
})
export type CreateProductDTO = Pick<
  Product,
  "title" | "description" | "image" | "inStock" | "userId" | "price"
>

export type ProductModel = Prisma.ProductGetPayload<{
  include: {
    sizes: true
  }
}>

export function createRandomProducts(createdById: string): CreateProductDTO {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    image: faker.image.url(),
    inStock: faker.datatype.boolean({ probability: 0.2 }),
    userId: createdById,
  }
}
async function addSizesToProducts(
  ctx: inferAsyncReturnType<typeof createTRPCContext>,
  userID: string,
  productData: CreateProductDTO
) {
  // Connect or create new sizes
  const connectOrCreateSizes = ctx.prisma.product.create({
    data: {
      ...productData,
      sizes: {
        connectOrCreate: faker.helpers
          .arrayElements(["S", "L", "M", "XL"], {
            min: 1,
            max: 2,
          })
          .map((size) => ({
            where: { name: size },
            create: { name: size },
          })),
      },
    },
  })

  // Transaction to ensure either BOTH operations happen or NONE of them happen
  await ctx.prisma.$transaction([connectOrCreateSizes])
}
