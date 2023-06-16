//@ts-check
import express from "express"


const routerVistaRealTimeProducts = express.Router()

routerVistaRealTimeProducts.get("/", (req, res) => {
    return res.render("products-socket", {})
})

export default routerVistaRealTimeProducts