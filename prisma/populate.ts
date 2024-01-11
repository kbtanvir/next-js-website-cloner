import { createRandomProducts } from "./data/faker-data"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const PRODUCTS = [] as ReturnType<typeof createRandomProducts>[]

  Array.from({ length: 100 }).forEach(() => {
    PRODUCTS.push(createRandomProducts("cllz5ogy40000bj6c0xn8r50u"))
  })
  const data = PRODUCTS.map((product) => ({ ...product }))

  await prisma.product.createMany({
    data: data,
  })
}

main()
  .then(async () => {
    console.log("Seeded products")

    await prisma.$disconnect()

    console.log("Disconnected from database")
  })
  .catch(async () => {
    await prisma.$disconnect()
    process.exit(1)
  })
