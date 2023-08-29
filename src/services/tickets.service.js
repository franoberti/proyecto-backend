import { Tickets } from "../DAO/tickets.factory.js"

class TicketService {

    async createTicket(ticket) {
        const ticketCreated = await Tickets.createCart(ticket)
        return ticketCreated
    }

}

export const ticketService = new TicketService()