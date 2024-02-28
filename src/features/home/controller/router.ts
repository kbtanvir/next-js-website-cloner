import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { ExampleValidations } from "../model/validations";

export const exampleRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(ExampleValidations.getAll)
    .query(async ({ ctx, input }) => {
      console.log(input);
      return [];
    }),
  getOne: publicProcedure
    .input(ExampleValidations.getOne)
    .query(async ({ ctx, input }) => {
      console.log(input);
      return {};
    }),
  writeOne: protectedProcedure
    .input(ExampleValidations.writeOne)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return {};
    }),
  deleteOne: protectedProcedure
    .input(ExampleValidations.deleteOne)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return {};
    }),
  deleteAll: protectedProcedure
    .input(ExampleValidations.deleteAll)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return {};
    }),
});
