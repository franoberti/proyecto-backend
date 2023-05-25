//@ts-check
import express from "express"
import ProductManager from "../handlers/productManager.js"

const prodManager = new ProductManager()
const products = prodManager.getProducts()

const routerVistaRealTimeProducts = express.Router()

routerVistaRealTimeProducts.get("/", (req, res) => {
    return res.render("products-socket", {
        titulo: "TITULO: PRODUCTS",
    })
})

export default routerVistaRealTimeProducts  