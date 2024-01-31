import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { prisma } from "~/server/db"

export const cartRouter = createTRPCRouter({
  syncCart: publicProcedure
    .input(z.array(z.string()))
    .query(async ({ input, ctx }) => {
      const products = await prisma.product.findMany({
        where: {
          id: {
            in: input,
          },
        },
      })

      return products
    }),
})
