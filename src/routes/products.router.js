//@ts-check
import express from "express"
import { ProductsModel } from "../DAO/mongo/models/products.model.js";
import { productService } from "../services/products.service.js";

const productsRouter = express.Router()


productsRouter.get('/', async (req, res) => {

    try {

        const {page, limit, query, sort} = req.query
        const products = await productService.getAllProductsPaginated(limit, page, query, sort)
        console.log(products)
        let productos = products.docs.map((prod) => {
            return {
                id: prod._id.toString(),
                title: prod.title,
                price: prod.price
            }
        })

        return res.status(200).json({
            status: "success",
            payload: productos,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.prevLink,
            nextLink: products.nextLink
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            msg: "Something went wrong :(",
            data: {}
        })
    }

})

productsRouter.get('/:pid', async (req, res) => {

    try {

        const id = req.params.pid
        const product = await productService.getProductById(id)

        if (product) {
            return res.status(200).json({
                status: "success",
                msg: "producto encontrado con exito",
                data: product
            })
        }
        else {
            return res.status(400).json({
                status: "error",
                msg: "producto no encontrado",
                data: {}
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            msg: "Something went wrong :(",
            data: {}
        })
    }

})

productsRouter.post('/', async (req, res) => {

    try {
        const product = req.body
        const productCreated = await productService.createProduct(product)

        return res.status(201).json({
            status: "success",
            msg: "product created",
            data: productCreated
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            msg: "Something went wrong :(",
            data: {}
        })
    }

}
)

productsRouter.put('/:pid', async (req, res) => {

    try {
        const id = req.params.pid
        const product = req.body

        const productUpdated = await productService.updateProduct(product, id)

        return res.status(200).json({
            status: "success",
            msg: "product updated",
            data: productUpdated
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            msg: "Something went wrong :(",
            data: {}
        })
    }

})

productsRouter.delete('/:pid', async (req, res) => {

    try {

        const id = req.params.pid

        const productDeleted = await productService.deleteProduct(id)

        return res.status(200).json({
            status: "success",
            msg: "producto eliminado con exito",
            data: productDeleted
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            msg: "Something went wrong :(",
            data: {}
        })
    }

}
)

export default productsRouter