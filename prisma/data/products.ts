import { createRandomProducts } from "./faker-data"
import { type Product } from "@prisma/client"

const PRODUCTS = [] as ReturnType<typeof createRandomProducts>[]

Array.from({ length: 100 }).forEach(() => {
  PRODUCTS.push(createRandomProducts("cllz5ogy40000bj6c0xn8r50u"))
})

export const fakeProducts: Partial<Product>[] = PRODUCTS.map((product) => ({
  ...product,
}))
