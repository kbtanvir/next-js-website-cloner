import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const cartRouter = createTRPCRouter({
  getIninite: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.cart.findMany({
      where: {
        userId: ctx.session?.user.id,
      },
      include: {
        product: {
          include: {
            sizes: true,
          },
        },
      },
    })

    return data
  }),

  deleteAll: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.products.deleteMany()

    return true
  }),

  updateCart: publicProcedure
    .input(
      z.object({
        productId: z.string(),
        action: z.enum(["add", "remove"]).optional(),
        quantity: z.number().min(0).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id as string

      if (userId == null) {
        throw new Error("You must be logged in to do this")
      }

      // if cart item does not exist create
      if (input.quantity) {
        await ctx.prisma.cart.update({
          where: {
            userId_productId: {
              userId,
              productId: input.productId,
            },
          },
          data: {
            qty: input.quantity,
          },
        })
        return true
      }

      if (input.action === "add") {
        await ctx.prisma.cart.upsert({
          where: {
            userId_productId: {
              userId,
              productId: input.productId,
            },
          },
          update: {
            qty: {
              increment: 1,
            },
          },
          create: {
            qty: 1,
            product: {
              connect: {
                id: input.productId,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
          },
        })
        return true
      }

      if (input.action === "remove") {
        await ctx.prisma.cart.delete({
          where: {
            userId_productId: {
              userId,
              productId: input.productId,
            },
          },
        })
        return true
      }
    }),
})
