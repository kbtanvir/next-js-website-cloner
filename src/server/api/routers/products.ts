import { createRandomProducts } from "@/prisma/data/faker-data"
import { type Prisma } from "@prisma/client"
import { type inferAsyncReturnType } from "@trpc/server"
import { z } from "zod"
import {
  createTRPCRouter,
  publicProcedure,
  type createTRPCContext,
} from "~/server/api/trpc"

export const productRouter = createTRPCRouter({
  infiniteProducts: publicProcedure
    .input(
      z.object({
        onlyFollowing: z.boolean().optional(),
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      })
    )
    .query(async ({ input: { limit = 10, cursor }, ctx }) => {
      return await getInfiniteProducts({
        limit,
        ctx,
        cursor,
      })
    }),
  deleteAllProducts: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.product.deleteMany()
    return true
  }),
  addFake100: publicProcedure.mutation(async ({ ctx }) => {
    const userID = ctx.session?.user.id

    if (userID == null) {
      throw new Error("You must be logged in to do this")
    }

    const PRODUCTS = [] as ReturnType<typeof createRandomProducts>[]

    Array.from({ length: 100 }).forEach(() => {
      PRODUCTS.push(createRandomProducts(userID))
    })
    const data = PRODUCTS.map((product) => ({ ...product }))

    await ctx.prisma.product.createMany({
      data,
    })
  }),
})

async function getInfiniteProducts({
  whereClause,
  ctx,
  limit,
  cursor,
}: {
  whereClause?: Prisma.ProductWhereInput
  limit: number
  cursor: { id: string; createdAt: Date } | undefined
  ctx: inferAsyncReturnType<typeof createTRPCContext>
}) {
  const data = await ctx.prisma.product.findMany({
    take: limit + 1,
    cursor: cursor ? { createdAt_id: cursor } : undefined,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    where: whereClause,
    select: {
      id: true,
      title: true,
      price: true,
      image: true,
      description: true,
      createdAt: true,
      user: {
        select: { name: true, id: true, image: true },
      },
    },
  })

  let nextCursor: typeof cursor | undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem != null) {
      nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt }
    }
  }

  return {
    products: data.map((product) => {
      return {
        ...product,
      }
    }),
    nextCursor,
  }
}
