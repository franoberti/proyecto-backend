import { environment } from "../environment.js";
import MongoSingleton from "../utils/connections.js";

export let Tickets

switch (environment.PERSISTENCE) {
    case "MONGO":
        MongoSingleton.getInstance()

        const { ticketMongo } = await import('./mongo/tickets.mongo.js')
        Tickets = ticketMongo
        break;

    default:
        break;
}