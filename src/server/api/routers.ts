import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { faker } from "@faker-js/faker";
import { TaxonomyValidations, UserValidations } from "../../utils/validations";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(UserValidations.getAll)
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findMany(input);
    }),
  getOne: publicProcedure
    .input(UserValidations.getOne)
    .query(async ({ ctx, input }) => {
      console.log(input);
      return {};
    }),
  writeOne: protectedProcedure
    .input(UserValidations.writeOne)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return {};
    }),
  deleteOne: protectedProcedure
    .input(UserValidations.deleteOne)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return {};
    }),
  deleteAll: protectedProcedure
    .input(UserValidations.deleteAll)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return {};
    }),
});

export const taxonomyRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(TaxonomyValidations.getAll)
    .query(async ({ ctx, input }) => {
      return await ctx.db.taxonomy.findMany(input);
    }),
  populateFake: protectedProcedure
    .input(TaxonomyValidations.writeOne)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.taxonomy.create({
        data: {
          name: faker.word.adjective(),
        },
      });
    }),
  getOne: publicProcedure
    .input(TaxonomyValidations.getOne)
    .query(async ({ ctx, input }) => {
      console.log(input);
      return {};
    }),
  writeOne: protectedProcedure
    .input(TaxonomyValidations.writeOne)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return {};
    }),
  deleteOne: protectedProcedure
    .input(TaxonomyValidations.deleteOne)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return {};
    }),
  deleteAll: protectedProcedure
    .input(TaxonomyValidations.deleteAll)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return {};
    }),
});

export const siteRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(TaxonomyValidations.getAll)
    .query(async ({ ctx, input }) => {
      return await ctx.db.taxonomy.findMany(input);
    }),
  populateFake: protectedProcedure
    .input(TaxonomyValidations.writeOne)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.taxonomy.create({
        data: {
          name: faker.word.adjective(),
        },
      });
    }),
});
