"use strict";
exports.__esModule = true;
exports.createRandomProducts = void 0;
var faker_1 = require("@faker-js/faker");
// export function createRandomUser() {
//   return {
//     id: faker.string.uuid,
//     name: faker.person.lastName,
//     email: faker.internet.email,
//   }
// }
function createRandomProducts(createdById) {
    return {
        title: faker_1.faker.commerce.productName(),
        description: faker_1.faker.commerce.productDescription(),
        price: parseFloat(faker_1.faker.commerce.price()),
        image: faker_1.faker.image.url(),
        userId: createdById
    };
}
exports.createRandomProducts = createRandomProducts;
// export function createRandomImage(postId: string) {
//   return {
//     id: faker.datatype.uuid(),
//     url: `${faker.image.imageUrl()}?random=${Math.round(Math.random() * 500)}`,
//     postId,
//   }
// }
