import { environment } from "../environment.js";
import MongoSingleton from "../utils/connections.js";

export let Users

switch (environment.PERSISTENCE) {
    case "MONGO":
        MongoSingleton.getInstance()

        const { usersMongo } = await import('./mongo/users.mongo.js')
        Users = usersMongo
        break;

    default:
        break;
}