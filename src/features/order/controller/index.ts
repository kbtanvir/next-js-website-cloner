import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";
import { PaymentMethodEnum, checkoutFormSchema } from "../view/Page";

export const CartItemSchema = z.object({
  productId: z.string(),
  qty: z.number(),
});

export const CreateOrderInput = z.object({
  items: z.array(CartItemSchema),
  data: checkoutFormSchema,
});

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
  createOrder: publicProcedure
    .input(CreateOrderInput)
    .mutation(async ({ input, ctx }) => {
      const total = await calculatePrice(input.items);

      const { paymentMethod, ...userAdress } = input.data;

      await ctx.db.order.create({
        data: {
          payment: {
            create: {
              status: PaymentMethodEnum.COD
                ? PaymentStatus.UNPAID
                : PaymentStatus.PAID,
              provider: paymentMethod,
              amount: total,
            },
          },
          billingAddress: {
            connectOrCreate: {
              where: {
                email: input.data.email,
              },
              create: {
                ...userAdress,
              },
            },
          },
          total,
          status: OrderStatus.PENDING,
          items: {
            createMany: {
              data: input.items.map((item) => ({
                qty: item.qty,
                productId: item.productId,
              })),
            },
          },
        },
      });

      return true;
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    // const userId = ctx.session?.user.id

    const orders = await ctx.db.order.findMany({
      // where: {
      //   userId,
      // },
      include: {
        items: true,
        billingAddress: true,
      },
    });

    return orders;
  }),
});

async function calculatePrice(
  items: z.infer<typeof CartItemSchema>[],
): Promise<number> {
  let total = 0;

  const products = await db.product.findMany({
    where: {
      id: {
        in: items.map((item) => item.productId),
      },
    },
  });

  items.forEach((item) => {
    const product = products.find((product) => product.id === item.productId);
    if (!product) {
      throw new Error(`Product with id not found`);
    }
    total += product.price * item.qty;
  });

  return total;
}
