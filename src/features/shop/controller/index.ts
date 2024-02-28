import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { featuredProductActiveTab } from "@/utils/global.store";
import { faker } from "@faker-js/faker";
import { type Prisma } from "@prisma/client";
import { z } from "zod";
import { productsQueryInput } from "../model";

export const productRouter = createTRPCRouter({
  infiniteProducts: publicProcedure
    .input(productsQueryInput)
    .query(async ({ input, ctx }) => {
      const whereClause: Prisma.ProductWhereInput = {};

      let orderBy;

      if (input.inStock === true) {
        whereClause.inStock = true;
      }

      if (input.sizes?.length) {
        whereClause.OR = [];
        const sizes = input.sizes.map((size) => ({
          sizes: {
            some: {
              name: size,
            },
          },
        }));
        whereClause.OR = [...sizes];
      }

      if (input.price) {
        whereClause.price = input.price;
      }

      if (input.sort) {
        orderBy = [];

        const [field, order] = input.sort.split("_");

        orderBy.push({ [field!]: order });
      }

      if (input.wishlist) {
        whereClause.wishlist = {
          some: {
            userId: ctx.session?.user.id,
          },
        };
      }

      if (input.categories) {
        whereClause.categories = {
          some: {
            name: {
              in: input.categories,
            },
          },
        };
      }

      const data = await ctx.db.product.findMany({
        take: input.limit ? input.limit + 1 : undefined,
        cursor: input.cursor ? { createdAt_id: input.cursor } : undefined,
        orderBy,
        where: { ...whereClause },
        include: {
          sizes: true,
          wishlist: {
            where: {
              userId: ctx.session?.user.id,
            },
            take: 1,
          },
          discount: true,
        },
      });

      let nextCursor: typeof input.cursor | undefined;

      if (data.length > (input.limit ?? 10)) {
        const nextItem = data.pop();
        if (nextItem != null) {
          nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt };
        }
      }

      return {
        products: data.map((product) => {
          return {
            ...product,
          };
        }),
        nextCursor,
      };
    }),
  getLatestProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        orderBy: z.enum(featuredProductActiveTab).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const orderBy: Prisma.ProductOrderByWithRelationInput = {};
      if (input.orderBy === "popularity") {
        orderBy.inStock = "asc";
      }
      if (input.orderBy === "sale") {
        orderBy.updatedAt = "asc";
      }
      if (input.orderBy === "createdAt") {
        orderBy.createdAt = "asc";
      }
      return await ctx.db.product.findMany({
        take: 6,
        orderBy,
        include: {
          sizes: true,
          wishlist: {
            where: {
              userId: ctx.session?.user.id,
            },
            take: 1,
          },
          discount: true,
        },
      });
    }),
  deleteAll: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.db.product.deleteMany();

    return true;
  }),
  searchProducts: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.db.product.findMany({
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
      });

      return data;
    }),
  getWishListCount: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;

    if (userId == null) {
      throw new Error("You must be logged in to do this");
    }

    return await ctx.db.wishlist.count({
      where: {
        userId,
      },
    });
  }),
  updateWish: publicProcedure
    .input(
      z.object({
        productId: z.string(),
        action: z.enum(["add", "remove"]).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id;

      if (userId == null) {
        throw new Error("You must be logged in to do this");
      }

      if (input.action === "add") {
        await ctx.db.wishlist.create({
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
        });

        return true;
      }

      await ctx.db.wishlist.delete({
        where: {
          userId_productId: {
            userId,
            productId: input.productId,
          },
        },
      });
      return true;
    }),

  addFakeProducts: publicProcedure.mutation(async ({ ctx }) => {
    const productCount = 30;

    await ctx.db.product.deleteMany();
    // await ctx.db.size.deleteMany()
    // await ctx.db.category.deleteMany()
    await ctx.db.discount.deleteMany();

    // await ctx.db.size.createMany({
    //   data: ["S", "L", "M", "XL"].map((size) => ({
    //     name: size,
    //   })),
    // })

    // await ctx.db.category.createMany({
    //   data: ["men", "women", "kids"].map((category) => ({
    //     name: category,
    //   })),
    // })
    await ctx.db.discount.createMany({
      data: [
        {
          code: "DISCOUNT10",
          amount: 0.1,
          expires: new Date("2022-12-12"),
        },
        {
          code: "NEWYEAR20",
          amount: 0.2,
          expires: new Date("2022-12-12"),
        },
      ].map((item) => ({
        ...item,
      })) as Prisma.DiscountCreateManyInput[],
    });

    // Create new products without sizes
    const PRODUCTS = Array.from({ length: productCount }).map(
      () =>
        ({
          // id: faker.string.uuid(),
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price()),
          image: faker.image.url(),
          inStock: faker.datatype.boolean({ probability: 0.5 }),
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
          discountCode: Math.random() > 0.5 ? "DISCOUNT10" : "NEWYEAR20",
        }) as Partial<Prisma.ProductCreateInput>,
    );

    // Use bulk promise to update all products with sizes
    const updatePromises = PRODUCTS.map(
      async (productData) =>
        await ctx.db.product.create({
          data: productData as Prisma.ProductCreateInput,
        }),
    );
    await Promise.all(updatePromises);

    // await addToWishList(ctx, userID, PRODUCTS)
  }),
});
