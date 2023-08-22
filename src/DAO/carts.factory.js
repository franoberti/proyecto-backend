import { environment } from "../environment.js";
import MongoSingleton from "../utils/connections.js";

export let Carts

switch (environment.PERSISTENCE) {
    case "MONGO":
        console.log('Mongo connect')
        MongoSingleton.getInstance()

        const { cartsMongo } = await import('./mongo/carts.mongo.js')
        Carts = cartsMongo
        break;

    default:
        break;
}