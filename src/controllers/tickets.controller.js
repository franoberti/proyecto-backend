import { logger } from "../middlewares/logger.js";
import { ticketService } from "../services/tickets.service.js";

class TicketsController {

    constructor(){}

    async createTicket(req, res){
        try {
            const ticket = req.body
            const cartCreated = await ticketService.createTicket(ticket)
            return res.status(200).json({
                status: "success",
                msg: "Carrito creado con exito",
                data: cartCreated
            })
    
        } catch (error) {
            logger.error(error)
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                data: {}
            })
        }
    }
}

export const ticketsController = new TicketsController()