/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ProductsQueryInput,
  type IProductQueryInput,
} from "@/components/sidebar"
import { createRandomProducts } from "@/prisma/data/faker-data"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const productRouter = createTRPCRouter({
  infiniteProducts: publicProcedure
    .input(ProductsQueryInput)
    .query(async ({ input, ctx }) => {
      const whereClause: IProductQueryInput = {}

      if (input.inStock) {
        whereClause.inStock = true
      }

      // if (input.sizes?.length) {
      //   whereClause.sizes = input.sizes
      // }

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
        },
      })

      let nextCursor: typeof input.cursor | undefined

      if (data.length > (input.limit ?? 10)) {
        const nextItem = data.pop()
        if (nextItem != null) {
          nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt }
        }
      }

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

    const PRODUCTS = [] as ReturnType<typeof createRandomProducts>[]

    Array.from({ length: 100 }).forEach(() => {
      PRODUCTS.push(createRandomProducts(userID))
    })

    const data = PRODUCTS.map((product) => ({ ...product }))

    await ctx.prisma.product.createMany({
      data,
    })
  }),
})
