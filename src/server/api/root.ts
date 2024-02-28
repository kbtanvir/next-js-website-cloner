import { cartRouter } from "@/features/cart/controller";
import { orderRouter } from "@/features/order/controller";
import { productRouter } from "@/features/shop/controller";
import { siteRouter, taxonomyRouter, userRouter } from "@/server/api/routers";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  product: productRouter,
  order: orderRouter,
  cart: cartRouter,
  taxonomy: taxonomyRouter,
  site: siteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
