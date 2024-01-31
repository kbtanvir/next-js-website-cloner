import { PaymentMethodEnum, checkoutFormSchema } from "../view/Page"
import { z } from "zod"
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc"
import { prisma } from "~/server/db"

export const CreateOrderInput = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      qty: z.number(),
      price: z.number(),
    })
  ),
  data: checkoutFormSchema,
})

export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
export enum PaymentStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}

export const orderRouter = createTRPCRouter({
  createOrder: protectedProcedure
    .input(CreateOrderInput)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id

      if (!userId) {
        throw new Error("You must be logged in to create an order")
      }

      const total = input.items.reduce((acc, item) => {
        return acc + item.price * item.qty
      }, 0)

      const { paymentMethod, ...userAdress } = input.data

      const payment = () => {
        if (paymentMethod === PaymentMethodEnum.COD) {
          return {
            create: {
              status: PaymentStatus.UNPAID,
              provider: PaymentMethodEnum.COD,
              amount: total,
            },
          }
        }
        return {
          create: {
            status: PaymentStatus.PAID,
            provider: PaymentMethodEnum.CREDIT_CARD,
            amount: total,
          },
        }
      }

      await prisma.order.create({
        data: {
          payment: (() => {
            if (paymentMethod === PaymentMethodEnum.COD) {
              return {
                create: {
                  status: PaymentStatus.UNPAID,
                  provider: PaymentMethodEnum.COD,
                  amount: total,
                },
              }
            }
            return {
              create: {
                status: PaymentStatus.PAID,
                provider: PaymentMethodEnum.CREDIT_CARD,
                amount: total,
              },
            }
          })(),
          billingAddress: {
            connectOrCreate: {
              where: {
                email: input.data.email,
              },
              create: {
                ...userAdress,
                user: {
                  connect: {
                    id: userId,
                  },
                },
              },
            },
          },
          total,
          status: OrderStatus.PENDING,
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
  getAll: publicProcedure.query(async ({ ctx }) => {
    // const userId = ctx.session?.user.id

    const orders = await prisma.order.findMany({
      // where: {
      //   userId,
      // },
      include: {
        items: true,
        billingAddress: true,
      },
    })

    return orders
  }),
})
