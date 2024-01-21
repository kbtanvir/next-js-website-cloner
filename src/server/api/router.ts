import { productRouter } from "../../../features/shop/controller"
import { wishlistRouter } from "@/features/wishlist/controller"
import { createTRPCRouter } from "~/server/api/trpc"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  // wishlist: wishlistRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
