import { logger } from "../middlewares/logger.js"
import { cartService } from "../services/carts.service.js"

class CartsController {
    
    

    constructor(){}

    async getAll(req, res){
        try {
 
            const carts = await cartService.getAllCarts()
        
            return res.status(200).json({
                status: "success",
                msg: "carritos encontrados con exito",
                data: carts
            })
        } catch (error) {
            logger.error(error)
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                data: {}
            })
        }
    }

    async getById(req, res){
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
            logger.error(error);
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                data: {}
            })
        }
    }

    async addProductByCart(req, res){
        try {
            const id = req.params.cid
            const prodId = req.params.pid
        
            const cart = await cartService.addProductByCart(id, prodId)
        
            return res.status(200).json({
                status: "success",
                msg: "producto incorporado al carrito con exito",
                data: cart
            })
            
        } catch (error) {
            logger.error(error)
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                data: {}
            })
        }
    
    }

    async createCart(req, res){
        try {
            const cartCreated = await cartService.createCart()
            return res.status(201).json({
                status: "success",
                msg: "Carrito creado con exito",
                data: cartCreated
            })
    
        } catch (error) {
            logger.error(error)
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                data: {}
            })
        }
    }

    async deleteProductByCart(req, res){
        try {
            const id = req.params.cid
            const prodId = req.params.pid
        
            const cartUpdated = await cartService.deleteProductByCart(id, prodId)
            
            if(cartUpdated === undefined){
    
                return res.status(401).json({
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
            logger.error(error)
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                data: {}
            })
        }
    }

    async updateAllProductsOnCart(req, res){
        try {

            const idCart = req.params.cid
            const products = req.body
            const cart = await cartService.updateAllProductsOnCart(idCart, products)
    
            return res.status(200).json({
                status: "success",
                msg: "carrito actualizado con exito",
                data: cart
            })
    
    
        } catch (error) {
            logger.error(error)
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                data: {}
            })
        }
    }

    async purchase(req, res) {
        try {
            const idCart = req.params.cid
            const purchaser = req.session.user.email
            const cart = await cartService.purchase(idCart, purchaser)
    
            return res.status(200).json({
                status: "success",
                msg: "La compra se ha realizado y el carrito actualizado con exito",
                data: cart
            })


        } catch (error) {
            logger.error(error)
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                data: {}
            })
        }
    }

    async updateQuantityOfOneProduct(req, res){
        try {

            const idCart = req.params.cid
            const idProd = req.params.pid
            const quantity = req.body.quantity
            const cart = await cartService.updateQuantity(idCart, idProd, quantity)
    
            if(cart === undefined){
    
                return res.status(401).json({
                    status: "error",
                    msg: "El producto que desea actualizar no existe en el carrito",
                    data: {}
                })
            }
            else{
                return res.status(200).json({
                    status: "success",
                    msg: "producto del carrito actualizado con exito",
                    data: cart
                })
            }
    
    
        } catch (error) {
            logger.error(error)
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                data: {}
            })
        }
    }

    async deleteAllProducts(req, res){
        try {

            const idCart = req.params.cid
            const cart = await cartService.deleteAllProductsOnCart(idCart)
    
            return res.status(200).json({
                status: "success",
                msg: "carrito actualizado con exito",
                data: cart
            })
    
    
        } catch (error) {
            logger.error(error)
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                data: {}
            })
        }
    }
}

export const cartsController = new CartsController()