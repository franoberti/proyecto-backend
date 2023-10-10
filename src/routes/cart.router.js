//@ts-check
import express from "express"
import { cartsController } from "../controllers/carts.controller.js"

const cartsRouter = express.Router()

cartsRouter.get('/', cartsController.getAll)  

cartsRouter.post('/', cartsController.createCart)

cartsRouter.get('/:cid', cartsController.getById)

cartsRouter.put('/:cid', cartsController.updateAllProductsOnCart)

cartsRouter.delete('/:cid/products', cartsController.deleteAllProducts)

cartsRouter.post('/:cid/products/:pid', cartsController.addProductByCart)

cartsRouter.put('/:cid/products/:pid', cartsController.updateQuantityOfOneProduct)

cartsRouter.delete('/:cid/products/:pid', cartsController.deleteProductByCart)

cartsRouter.put('/:cid/purchase', cartsController.purchase)

export default cartsRouter