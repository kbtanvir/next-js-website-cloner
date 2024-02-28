import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const cartRouter = createTRPCRouter({
  syncCart: publicProcedure
    .input(z.array(z.string()))
    .query(async ({ input, ctx }) => {
      const products = await ctx.db.product.findMany({
        where: {
          id: {
            in: input,
          },
        },
      });

      return products;
    }),
});
