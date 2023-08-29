import { TicketsModel } from './models/tickets.model.js'

class Tickets {

    constructor() { }

    async createTicket(ticket){
        const { code, purchase_datetime, amount, purchaser} = ticket
        const ticketCreated = await TicketsModel.create({code, purchase_datetime, amount, purchaser})
        return ticketCreated
    }

}

export const ticketsMongo = new Tickets()