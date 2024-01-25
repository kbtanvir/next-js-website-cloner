import { Client } from "@planetscale/database"
import { PrismaPlanetScale } from "@prisma/adapter-planetscale"
import { PrismaClient } from "@prisma/client"

declare const env: {
  DATABASE_URL: string
  NODE_ENV: string
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const client = new Client({ url: env.DATABASE_URL })

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    adapter: new PrismaPlanetScale(client),
  })

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
