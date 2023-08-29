//@ts-check
import express from "express"
import { cartsController } from "../controllers/carts.controller.js"

const cartsRouter = express.Router()

cartsRouter.get('/', cartsController.getAll)  

cartsRouter.get('/:cid', cartsController.getById)

cartsRouter.post('/:cid/products/:pid', cartsController.addProductByCart)

cartsRouter.post('/', cartsController.createCart)

cartsRouter.delete('/:cid/products/:pid', cartsController.deleteProductByCart)

cartsRouter.put('/:cid', cartsController.updateAllProductsOnCart)

cartsRouter.put('/:cid/purchase', cartsController.purchase)

cartsRouter.put('/:cid/products/:pid', cartsController.updateQuantityOfOneProduct)

cartsRouter.delete('/:cid/products', cartsController.deleteAllProducts)

export default cartsRouter