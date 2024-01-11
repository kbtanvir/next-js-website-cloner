import { type GetServerSidePropsContext } from "next"
import NextAuth, { getServerSession } from "next-auth"
import { authOptions } from "~/server/auth"

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"]
  res: GetServerSidePropsContext["res"]
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}

export default NextAuth(authOptions)
