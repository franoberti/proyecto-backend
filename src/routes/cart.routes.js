import express from "express"
import CartManager from "../cartManager.js"

const cartsRouter = express.Router()

const cartManager = new CartManager();
let carts = cartManager.getCarts()


cartsRouter.get('/', (req,res)=> {

    return res.status(200).json({
        status: "success",
        msg: "carritos encontrados con exito",
        data: carts
    })

})  

cartsRouter.get('/:cid', (req,res)=> {

    const id = req.params.cid
    const cart = carts.find((c) => c.id == id)

    if(cart){
        return res.status(200).json({
            status: "success",
            msg: "carrito encontrado con exito",
            data: cart.products
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

cartsRouter.post('/', (req,res)=> {

    const cart = req.body
    cartManager.addCart(cart)
    carts = cartManager.getCarts()

    return res.status(200).json({
        status: "success",
        msg: "carrito creado con exito",
        data: carts
    })
}
)

export default cartsRouter