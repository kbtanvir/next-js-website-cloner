import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const cartRouter = createTRPCRouter({
  deleteAll: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.product.deleteMany()

    return true
  }),
  update: publicProcedure
    .input(
      z.object({
        productId: z.string(),
        action: z.enum(["update", "add", "remove"]),
        quantity: z.number().min(0).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id

      if (userId == null) {
        throw new Error("You must be logged in to do this")
      }

      if (input.quantity && input.quantity < 1) {
        throw new Error("Quantity must be greater than 0")
      }

      if (input.action === "add") {
        await ctx.prisma.cart.create({
          data: {
            userId,
            cartItems: {
              connectOrCreate: {
                where: {
                  productId: input.productId,
                },
                create: {
                  productId: input.productId,
                  quantity: 1,
                },
              },
            },
          },
        })
      }
      if (input.action === "update") {
        await ctx.prisma.cart.update({
          where: {
            userId,
          },
          data: {
            cartItems: {
              update: {
                where: {
                  productId: input.productId,
                },
                data: {
                  quantity: input.quantity,
                },
              },
            },
          },
        })
      }
      if (input.action === "remove") {
        await ctx.prisma.cart.update({
          where: {
            userId,
          },
          data: {
            cartItems: {
              delete: {
                productId: input.productId,
              },
            },
          },
        })
      }

      return true
    }),

  listProductsInCart: publicProcedure
    .input(
      z.object({
        limit: z.number().min(10).optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id

      if (userId == null) {
        throw new Error("You must be logged in to do this")
      }

      const cartItems = await ctx.prisma.cart.findUnique({
        where: {
          userId,
        },
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
      })

      return cartItems
    }),
})
