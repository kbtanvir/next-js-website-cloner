import { faker } from "@faker-js/faker"
import { PrismaClient, type Prisma } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const productCount = 30

  await prisma.discount.createMany({
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
      code: item.code,
      amount: item.amount,
      expires: item.expires,
    })) as Prisma.DiscountCreateManyInput[],
  })

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
        discount: {
          connectOrCreate: {
            where: {
              code: "DISCOUNT10",
            },
            create: {
              code: "DISCOUNT10",
              amount: 0.1,
              expires: new Date("2022-12-12"),
            },
          },
        },
      } as Partial<Prisma.ProductCreateInput>)
  )

  // Use bulk promise to update all products with sizes
  const updatePromises = PRODUCTS.map(
    async (productData) =>
      await prisma.product.create({
        data: productData as Prisma.ProductCreateInput,
      })
  )
  await Promise.all(updatePromises)
}

main()
  .then(async () => {
    console.log("Seeded products")

    await prisma.$disconnect()

    console.log("Disconnected from database")
  })
  .catch(async () => {
    await prisma.$disconnect()
    console.error("Error seeding products")

    process.exit(1)
  })
