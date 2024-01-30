import { productRouter } from "../../../features/shop/controller"
import { orderRouter } from "@/features/order/controller"
import { createTRPCRouter } from "~/server/api/trpc"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  order: orderRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
