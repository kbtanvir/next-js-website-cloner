import { productsQueryInput } from "../model"
import { faker } from "@faker-js/faker"
import { type Prisma } from "@prisma/client"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const productRouter = createTRPCRouter({
  infiniteProducts: publicProcedure
    .input(productsQueryInput)
    .query(async ({ input, ctx }) => {
      const whereClause: Prisma.ProductWhereInput = {}

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
          some: {
            userId: ctx.session?.user.id,
          },
        }
      }

      if (input.categories) {
        whereClause.categories = {
          some: {
            name: {
              in: input.categories,
            },
          },
        }
      }

      const data = await ctx.prisma.product.findMany({
        take: input.limit ? input.limit + 1 : undefined,
        cursor: input.cursor ? { createdAt_id: input.cursor } : undefined,
        orderBy,
        where: { ...whereClause },
        include: {
          user: true,
          sizes: true,
          wishlist: {
            where: {
              userId: ctx.session?.user.id,
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
  searchProducts: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.prisma.product.findMany({
        take: 10,
        where: {
          OR: [
            {
              title: {
                contains: input,
              },
            },
            {
              description: {
                contains: input,
              },
            },
          ],
        },
      })

      return data
    }),

  updateWish: publicProcedure
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

      if (input.action === "add") {
        await ctx.prisma.wishlist.create({
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
          },
        })

        return true
      }

      await ctx.prisma.wishlist.delete({
        where: {
          userId_productId: {
            userId,
            productId: input.productId,
          },
        },
      })
      return true
    }),

  addFakeProducts: publicProcedure.mutation(async ({ ctx }) => {
    const userID = ctx.session?.user.id
    const productCount = 10

    if (userID == null) {
      throw new Error("You must be logged in to do this")
    }

    // await ctx.prisma.product.deleteMany()

    // await ctx.prisma.size.createMany({
    //   data: ["S", "L", "M", "XL"].map((size) => ({
    //     name: size,
    //   })),
    // })

    // await ctx.prisma.category.createMany({
    //   data: ["men", "women", "kids"].map((category) => ({
    //     name: category,
    //   })),
    // })

    // Create new products without sizes
    const PRODUCTS = Array.from({ length: productCount }).map(() => ({
      // id: faker.string.uuid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      image: faker.image.url(),
      inStock: faker.datatype.boolean({ probability: 0.5 }),
      userId: userID,
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
      categories: {
        connectOrCreate: faker.helpers
          .arrayElements(["men", "women", "kids"], {
            min: 1,
            max: 4,
          })
          .map((categories) => ({
            where: { name: categories },
            create: { name: categories },
          })),
      },
    }))

    // Use bulk promise to update all products with sizes
    const updatePromises = PRODUCTS.map(
      async (productData) =>
        await ctx.prisma.product.create({
          data: productData,
        })
    )
    await Promise.all(updatePromises)

    // await addToWishList(ctx, userID, PRODUCTS)
  }),
})
