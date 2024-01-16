import { faker } from "@faker-js/faker"

// export function createRandomUser() {
//   return {
//     id: faker.string.uuid,
//     name: faker.person.lastName,
//     email: faker.internet.email,
//   }
// }

export function createRandomProducts(createdById: string) {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    image: faker.image.url(),
    inStock: faker.datatype.boolean({ probability: 0.2 }),
    userId: createdById,
  }
}

// export function createRandomImage(postId: string) {
//   return {
//     id: faker.datatype.uuid(),
//     url: `${faker.image.imageUrl()}?random=${Math.round(Math.random() * 500)}`,
//     postId,
//   }
// }
