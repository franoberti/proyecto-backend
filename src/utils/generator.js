
import { faker } from '@faker-js/faker'


export const generateProduct = () => {

    const timestamp = Date.now().toString(36); // Convertir tiempo a base 36
    const randomPart = Math.random().toString(36).substr(2, 5); // Parte aleatoria

    const uniqueCode = `${timestamp}-${randomPart}`;

    return {
        _id: faker.database.mongodbObjectId,
        title: faker.commerce.productName,
        description: faker.commerce.productDescription,
        price: faker.commerce.price,
        code: uniqueCode,
        stock: faker.string.numeric(2),
        status: true,
        category: faker.commerce.department
    }
}