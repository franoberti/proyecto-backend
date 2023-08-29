import express from "express"
import { ticketsController } from "../controllers/tickets.controller.js"

const ticketsRouter = express.Router()

ticketsRouter.post('/', ticketsController.createTicket)

export default ticketsRouter