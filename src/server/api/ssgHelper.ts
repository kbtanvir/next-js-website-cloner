import { appRouter } from "./router"
import { createInnerTRPCContext } from "./trpc"
import { createServerSideHelpers } from "@trpc/react-query/server"
import superjson from "superjson"

export function ssgHelper() {
  return createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null, revalidateSSG: null }),
    transformer: superjson,
  })
}
