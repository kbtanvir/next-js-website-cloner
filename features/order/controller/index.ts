import { userAddressFormSchema } from "../view/Page"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { prisma } from "~/server/db"

export const CreateOrderInput = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      qty: z.number(),
      price: z.number(),
    })
  ),
  total: z.number(),
  userAddress: userAddressFormSchema,
})

export const orderRouter = createTRPCRouter({
  createOrder: publicProcedure
    .input(CreateOrderInput)
    .mutation(async ({ input, ctx }) => {
      //   const userId = ctx.session?.user.id

      await prisma.order.create({
        data: {
          billingAddress: {
            connectOrCreate: {
              where: {
                email: input.userAddress.email,
              },
              create: {
                ...input.userAddress,
              },
            },
          },
          total: input.total,
          status: "PENDING",
          items: {
            createMany: {
              data: input.items.map((item) => ({
                qty: item.qty,
                price: item.price,
                productId: item.id,
              })),
            },
          },
        },
      })

      return true
    }),
})
