//@ts-check
import express from "express"
import { checkAdmin } from "../middlewares/main.js"

const routerVistaRealTimeProducts = express.Router()

routerVistaRealTimeProducts.get("/", checkAdmin, (req, res) => {
    return res.render("products-socket", {})
})

export default routerVistaRealTimeProducts