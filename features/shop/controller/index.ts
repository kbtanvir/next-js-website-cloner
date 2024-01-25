import {
  ProductsQueryInput,
  type CreateProductDTO,
  type IProductQueryInput,
} from "@/features/shop/model"
import { faker } from "@faker-js/faker"
import { type inferAsyncReturnType } from "@trpc/server"
import { z } from "zod"
import {
  createTRPCRouter,
  publicProcedure,
  type createTRPCContext,
} from "~/server/api/trpc"

export const productRouter = createTRPCRouter({
  infiniteProducts: publicProcedure
    .input(ProductsQueryInput)
    .query(async ({ input, ctx }) => {
      const whereClause: IProductQueryInput = {}
      let orderBy
      if (input.inStock === true) {
        whereClause.inStock = true
      }

      if (input.sizes?.length) {
        whereClause.OR = []
        const sizes = input.sizes.map((size) => ({
          sizes: {
            some: {
              name: size,
            },
          },
        }))
        whereClause.OR = [...sizes]
      }

      if (input.price) {
        whereClause.price = input.price
      }

      if (input.sort) {
        orderBy = []

        const [field, order] = input.sort.split("_")

        orderBy.push({ [field as string]: order })
      }

      if (input.wishlist) {
        whereClause.wishlist = {
          userId: ctx.session?.user.id,
        }
      }

      const data = await ctx.prisma.product.findMany({
        take: input.limit ? input.limit + 1 : undefined,
        cursor: input.cursor ? { createdAt_id: input.cursor } : undefined,
        orderBy,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        where: whereClause,
        include: {
          user: true,
          sizes: true,
          cartItem: {
            where: {
              userId: ctx.session?.user.id,
            },
            select: {
              qty: true,
            },
            take: 1,
          },
        },
      })

      let nextCursor: typeof input.cursor | undefined

      if (data.length > (input.limit ?? 10)) {
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
    }),

  deleteAll: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.product.deleteMany()

    return true
  }),
  updateWishList: publicProcedure
    .input(
      z.object({
        productId: z.string(),
        action: z.enum(["add", "remove"]).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id

      if (userId == null) {
        throw new Error("You must be logged in to do this")
      }

      const actions = {
        add: {
          connectOrCreate: {
            where: { userId },
            create: { userId },
          },
        },
        remove: {
          disconnect: {
            id: input.productId,
          },
        },
      }

      const data: { wishlist?: any; cart?: any } = {}

      if (input.action) {
        data.wishlist = actions[input.action]
      }

      await ctx.prisma.product.update({
        where: { id: input.productId },
        data,
      })

      return true
    }),
  updateCart: publicProcedure
    .input(
      z.object({
        productId: z.string(),
        action: z.enum(["add", "update", "remove"]).optional(),
        quantity: z.number().min(0).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id as string

      if (userId == null) {
        throw new Error("You must be logged in to do this")
      }

      // if cart item does not exist create

      if (input.action === "add") {
        await ctx.prisma.cartItem.create({
          data: {
            product: {
              connect: {
                id: input.productId,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
            qty: 1,
          },
        })
        return true
      }

      // if cart item exists update

      if (input.action === "update") {
        await ctx.prisma.cartItem.update({
          where: {
            userId_productId: {
              userId,
              productId: input.productId,
            },
          },
          data: {
            qty: input.quantity,
          },
        })
        return true
      }

      // if cart item exists delete

      if (input.action === "remove") {
        await ctx.prisma.cartItem.delete({
          where: {
            userId_productId: {
              userId,
              productId: input.productId,
            },
          },
        })
        return true
      }
    }),

  addFakeProducts: publicProcedure.mutation(async ({ ctx }) => {
    const userID = ctx.session?.user.id
    const productCount = 10

    if (userID == null) {
      throw new Error("You must be logged in to do this")
    }

    // Create new products without sizes
    const PRODUCTS = Array.from({ length: productCount }).map(() =>
      createRandomProducts(userID)
    )

    // Use bulk promise to update all products with sizes
    const updatePromises = PRODUCTS.map((productData) =>
      addSizesToProducts(ctx, userID, productData)
    )
    await Promise.all(updatePromises)

    // await addToWishList(ctx, userID, PRODUCTS)
  }),
})

export function createRandomProducts(createdById: string): CreateProductDTO {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    image: faker.image.url(),
    inStock: faker.datatype.boolean({ probability: 0.5 }),
    userId: createdById,
  }
}
export async function addSizesToProducts(
  ctx: inferAsyncReturnType<typeof createTRPCContext>,
  userID: string,
  productData: CreateProductDTO
) {
  // Connect or create new sizes
  const connectOrCreateSizes = ctx.prisma.product.create({
    data: {
      ...productData,
      sizes: {
        connectOrCreate: faker.helpers
          .arrayElements(["S", "L", "M", "XL"], {
            min: 1,
            max: 4,
          })
          .map((size) => ({
            where: { name: size },
            create: { name: size },
          })),
      },
    },
  })

  // Transaction to ensure either BOTH operations happen or NONE of them happen
  await ctx.prisma.$transaction([connectOrCreateSizes])
}

// async function addToWishList(
//   ctx: inferAsyncReturnType<typeof createTRPCContext>,
//   userID: string,
//   products: CreateProductDTO[]
// ) {
//   const ids = products.slice(0, 5).map((product) => ({ id: product.id }))
//   //  add to wishlist

//   const createWishList = ctx.prisma.wishlist.create({
//     data: {
//       userId: userID,
//       products: {
//         connect: ids,
//       },
//     },
//   })

//   // Transaction to ensure either BOTH operations happen or NONE of them happen

//   await ctx.prisma.$transaction([createWishList])
// }
