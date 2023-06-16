//@ts-check
import express from "express"
import { cartManager } from "../DAO/handlers/cartManager.js"
import { cartService } from "../services/carts.service.js"

const cartsRouter = express.Router()

cartsRouter.get('/', async (req,res)=> {

    try {

        const carts = await cartService.getAllCarts()
    
        return res.status(200).json({
            status: "success",
            msg: "carritos encontrados con exito",
            data: carts
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {}
        })
    }


})  

cartsRouter.get('/:cid', async (req,res)=> {

    try {

        const id = req.params.cid
        const cart = await cartService.getCartById(id)
    
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

    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {}
        })
    }



})

cartsRouter.post('/:cid/products/:pid', async (req,res)=> {

    try {
        const id = req.params.cid
        const prodId = req.params.pid
    
        /* cartManager.addProductByCart(id, prodId)
        const cart = cartManager.getCartById(id) */
    
        const cart = await cartService.addProductByCart(id, prodId)
    
        return res.status(200).json({
            status: "success",
            msg: "producto incorporado al carrito con exito",
            data: cart
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {}
        })
    }

})

cartsRouter.post('/', async (req, res) => {
    try {
        const cartCreated = await cartService.createCart()
        console.log(cartCreated)
        return res.status(200).json({
            status: "success",
            msg: "Carrito creado con exito",
            data: cartCreated
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {}
        })
    }
})

cartsRouter.delete('/:cid/products/:pid', async (req,res)=> {

    try {
        const id = req.params.cid
        const prodId = req.params.pid
    
        const cartUpdated = await cartService.deleteProductByCart(id, prodId)
        
        if(cartUpdated === undefined){

            return res.status(200).json({
                status: "error",
                msg: "El producto que desea eliminar no existe en el carrito",
                data: {}
            })
        }
        else{
            return res.status(200).json({
                status: "success",
                msg: "producto eliminado con exito del carrito",
                data: cartUpdated
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {}
        })
    }

})

cartsRouter.put('/:cid', async (req,res)=> {

    try {

        const id = req.params.cid
        const products = req.body
        const cart = await cartService.updateAllProductsOnCart(id, products)

        return res.status(200).json({
            status: "success",
            msg: "carrito actualizado con exito",
            data: cart
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {}
        })
    }


})

cartsRouter.put('/:cid/products/:pid', async (req,res)=> {

    try {

        const idCart = req.params.cid
        const idProd = req.params.pid
        const quantity = req.body.quantity
        const cart = await cartService.updateQuantity(idCart, idProd, quantity)

        if(cart === undefined){

            return res.status(200).json({
                status: "error",
                msg: "El producto que desea actualizar no existe en el carrito",
                data: {}
            })
        }
        else{
            return res.status(200).json({
                status: "success",
                msg: "producto actualizado con exito del carrito",
                data: cart
            })
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {}
        })
    }


})

cartsRouter.delete('/:cid', async (req,res)=> {

    try {

        const id = req.params.cid
        const cart = await cartService.deleteAllProductsOnCart(id)

        return res.status(200).json({
            status: "success",
            msg: "carrito actualizado con exito",
            data: cart
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {}
        })
    }

})

export default cartsRouter