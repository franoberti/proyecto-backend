//@ts-check
import express from "express"
import ProductManager from "../handlers/productManager.js"

const prodManager = new ProductManager()
const products = prodManager.getProducts()

const routerVistaProducts = express.Router()

routerVistaProducts.get("/", (req, res) => {
    return res.render("home", {
        titulo: "TITULO: PRODUCTS",
        products: products,
        dolar: 400 + Math.floor(Math.random() * 100)
    })
})

export default routerVistaProducts  