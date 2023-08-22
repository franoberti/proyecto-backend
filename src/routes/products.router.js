//@ts-check
import express from "express"
import { productsController } from "../controllers/products.controller.js";
import { validateCreateProduct, validateId, validateUpdateProduct } from "../middlewares/main.js";

const productsRouter = express.Router()

productsRouter.get('/', productsController.getAll)

productsRouter.get('/:pid', productsController.getById)

productsRouter.post('/', validateCreateProduct, productsController.createProduct)

productsRouter.put('/:pid', validateUpdateProduct, productsController.updateProduct)

productsRouter.delete('/:pid', validateId, productsController.deleteProduct)

export default productsRouter