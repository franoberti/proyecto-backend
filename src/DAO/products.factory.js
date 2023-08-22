import { environment } from "../environment.js";
import MongoSingleton from "../utils/connections.js";

export let Products

switch (environment.PERSISTENCE) {
    case "MONGO":
        MongoSingleton.getInstance()

        const { productsMongo } = await import('./mongo/products.mongo.js')
        Products = productsMongo
        break;

    default:
        break;
}