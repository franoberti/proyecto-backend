
import express from "express"
import { cartService } from "../services/carts.service.js"


const routerVistaCart = express.Router()

routerVistaCart.get("/:cid", async (req, res) => {

    try {

        const id = req.params.cid
        const cart = await cartService.getCartById(id)
        const cartId = req.session.user.cart

        const cartToShow = cart[0].products

        let productos = cartToShow.map((prod) => {
            return {
                id: prod.product._id.toString(),
                title: prod.product.title,
                price: prod.product.price,
                description: prod.product.description,
                quantity: prod.quantity
            }
        })
    
        if(cart){
            return res.render("cart", {
                status: "success",
                titulo: "CARRITO",
                payload: productos,
                cartId: cartId
            })
        }
        else{
            return res.status(400).json({
                status: "error",
                msg: "carrito no encontrado",
                data: {}
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {}
        })
    }

})

export default routerVistaCart