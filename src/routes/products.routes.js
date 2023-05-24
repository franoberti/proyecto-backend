import express from "express"
import ProductManager from "../handlers/productManager.js"

const productsRouter = express.Router()

const productManager = new ProductManager();
let products = productManager.getProducts()


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

productsRouter.delete('/:pid', (req,res)=> {

    const id = req.params.pid
    products = productManager.deleteProduct(id)

    return res.status(200).json({
        status: "success",
        msg: "producto eliminado con exito",
        data: products
    })
}
)

productsRouter.post('/', (req,res)=> {

    const product = req.body
    productManager.addProduct(product)
    products = productManager.getProducts()

    return res.status(200).json({
        status: "success",
        msg: "producto creado con exito",
        data: products
    })
}
)

productsRouter.put('/:pid', (req,res)=> {

    const id = req.params.pid
    const product = req.body
    productManager.updateProduct(product, id)
    products = productManager.getProducts()

    return res.status(200).json({
        status: "success",
        msg: "producto creado con exito",
        data: products
    })
}

)

export default productsRouter