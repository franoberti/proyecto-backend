import express from "express"
import ProductManager from "../entregable-productManager.js"

const productsRouter = express.Router()

const productManager = new ProductManager();
const products = productManager.getProducts()


productsRouter.get('/', (req,res)=> {

    if(req.query && req.query.limit){
        const productsToShow = products.slice(0, req.query.limit)
        return res.status(200).json({
            status: "success",
            msg: "A continuacion se muestran los primeros " + req.query.precio + " productos encontrados",
            data: productsToShow
        })
    }
    else{
        return res.status(200).json({
            status: "success",
            msg: "productos encontrados con exito",
            data: products
        })

    }
})  

productsRouter.get('/:pid', (req,res)=> {

    const id = req.params.pid
    const product = products.find((p) => p.id == id)

    if(product){
        return res.status(200).json({
            status: "success",
            msg: "producto encontrado con exito",
            data: product
        })
    }
    else{
        return res.status(400).json({
            status: "error",
            msg: "producto no encontrado",
            data: {}
        })
    }
})

export default productsRouter