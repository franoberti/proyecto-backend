
import express from "express"
import ProductManager from "../DAO/handlers/productManager.js"
import { ProductsModel } from "../DAO/models/products.model.js"
import { productService } from "../services/products.service.js"
import { URL, format } from 'url'

const prodManager = new ProductManager()
const products = prodManager.getProducts()

const routerVistaProducts = express.Router()

routerVistaProducts.get("/", async (req, res) => {

    const parametros = req.query;
    let urlPrev
    let urlNext


    const { page, limit, query, sort } = req.query

    const products = await productService.getAllProductsPaginated(limit, page, query, sort)

    let productos = products.docs.map((prod) => {
        return {
            id: prod._id.toString(),
            title: prod.title,
            price: prod.price,
            description: prod.description,
            category: prod.category,
            stock: prod.stock,
            status: prod.status.toString()
        }
    })


    if (products.hasPrevPage) {

        // Modificar un parámetro existente
        parametros.page = products.prevPage.toString();

        const urlObj = new URL(req.originalUrl, `http://${req.headers.host}`);
        urlObj.search = new URLSearchParams(parametros).toString();
        urlPrev = format(urlObj);

        console.log(urlPrev)
    }

    if (products.hasNextPage) {
        // Modificar un parámetro existente
        parametros.page = products.nextPage.toString();

        const urlObj = new URL(req.originalUrl, `http://${req.headers.host}`);
        urlObj.search = new URLSearchParams(parametros).toString();
        urlNext = format(urlObj);

        console.log(urlNext)
    }

    return res.render("home", {
        status: "success",
        titulo: "TITULO: PRODUCTS",
        payload: productos,
        urlPrev: urlPrev,
        urlNext: urlNext,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
    })
})

export default routerVistaProducts  