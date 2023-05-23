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

cartsRouter.post('/:cid/product/:pid', (req,res)=> {

    const id = req.params.cid
    const prodId = parseInt(req.params.pid) 

    cartManager.addProductByCart(id, prodId)
    const cart = cartManager.getCartById(id)

    return res.status(200).json({
        status: "success",
        msg: "producto incorporado al carrito con exito",
        data: cart
    })
}
)

export default cartsRouter