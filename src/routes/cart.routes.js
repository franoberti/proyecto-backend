import express from "express"
import { carts } from "../utils.js";

const cartsRouter = express.Router()

cartsRouter.get('/', (req,res)=> {

    if(req.query && req.query.limit){
        const productsToShow = carts.slice(0, req.query.limit)
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
            data: carts
        })

    }
})  

cartsRouter.get('/:cid', (req,res)=> {

    const id = req.params.cid
    const cart = carts.find((c) => c.id == id)

    if(cart){
        return res.status(200).json({
            status: "success",
            msg: "carrito encontrado con exito",
            data: cart
        })
    }
    else{
        return res.status(400).json({
            status: "error",
            msg: "carrito no encontrado",
            data: {}
        })
    }
})

export default cartsRouter