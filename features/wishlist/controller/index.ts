import {
  addSizesToProducts,
  createRandomProducts,
} from "@/features/shop/controller"
import {
  ProductsQueryInput,
  type IProductPropCount,
  type IProductQueryInput,
} from "@/features/shop/model"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const wishlistRouter = createTRPCRouter({
  infiniteProducts: publicProcedure
    .input(ProductsQueryInput)
    .query(async ({ input, ctx }) => {
      const whereClause: IProductQueryInput = {}
      let orderBy
      if (input.inStock === true) {
        whereClause.inStock = true
      }

      if (input.sizes?.length) {
        whereClause.OR = []
        const sizes = input.sizes.map((size) => ({
          sizes: {
            some: {
              name: size,
            },
          },
        }))
        whereClause.OR = [...sizes]
      }

      if (input.price) {
        whereClause.price = input.price
      }

      if (input.sort) {
        orderBy = []

        const [field, order] = input.sort.split("_")

        orderBy.push({ [field as string]: order })
      }

      const data = await ctx.prisma.product.findMany({
        take: input.limit ? input.limit + 1 : undefined,
        cursor: input.cursor ? { createdAt_id: input.cursor } : undefined,
        orderBy,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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

      return {
        products: data.map((product) => {
          return {
            ...product,
          }
        }),
        nextCursor,
      }
    }),
  productPropCounts: publicProcedure
    // .input(ProductPropCountSchema)
    .query(async ({ ctx }) => {
      const userId = ctx.session?.user.id

      if (userId == null) {
        throw new Error("You must be logged in to do this")
      }
      let data
      const input: IProductPropCount = {}

      input.inStock =
        (await ctx.prisma.product.count({
          where: { inStock: true },
        })) ?? 0

      // if (input.sizes?.length) {
      //   // todo: fix this
      // }

      data = await ctx.prisma.product.count({
        where: { wishlist: { userId } },
      })

      input.wishlist = data ?? 0

      data = await ctx.prisma.product.count({
        where: { cart: { userId } },
      })

      input.cart = data ?? 0

      data = await ctx.prisma.product.count()

      input.total = data ?? 0

      return input
    }),
  deleteAllProducts: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.product.deleteMany()

    return true
  }),
  updateProduct: publicProcedure
    .input(
      z.object({
        productId: z.string(),
        wishlist: z.enum(["add", "remove"]).optional(),
        cart: z.enum(["add", "remove"]).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id

      if (userId == null) {
        throw new Error("You must be logged in to do this")
      }

      const actions = {
        add: {
          connectOrCreate: {
            where: { userId },
            create: { userId },
          },
        },
        remove: {
          disconnect: {
            id: input.productId,
          },
        },
      }

      const data: { wishlist?: any; cart?: any } = {}

      if (input.wishlist) {
        data.wishlist = actions[input.wishlist]
      }

      if (input.cart) {
        data.cart = actions[input.cart]
      }
      // connect or create wishlist

      await ctx.prisma.product.update({
        where: { id: input.productId },
        data,
      })

      return true
    }),
 
})
