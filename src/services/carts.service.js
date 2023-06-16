

import { CartsModel } from "../DAO/models/carts.model.js"
import { ProductsModel } from "../DAO/models/products.model.js"

class CartService {

    async getAllCarts() {
        const carts = await CartsModel.find({}).populate('products.product')
        return carts
    }

    async getCartById(id) {
        const cart = await CartsModel.find({ _id: id }).populate('products.product')
        return cart
    }

    async addProductByCart(idCart, idProduct) {

        const cart = await CartsModel.find({ _id: idCart })

        let founded = false
        /* 
                const idCompare = "new ObjectId('" + idProduct + "')"
         */
        for (let i = 0; i < cart[0].products.length; i++) {
            //console.log("cart[0].products[", i, "].product = ", cart[0].products[i].product.toString(), "idProduct =", idProduct)
            if (cart[0].products[i].product.toString() === idProduct) {
                cart[0].products[i].quantity += 1
                founded = true
                break
            }
        }

        //console.log("valor de founded: ", founded)

        if (founded) {
            /* this.updatecart(cart, idCart) */
            const cartUpdated = await CartsModel.updateOne(
                { _id: idCart },
                { $set: { products: cart[0].products } }
            )
            return cartUpdated
        }
        else {
            cart[0].products.push({ "product": idProduct, "quantity": 1 })

            console.log("carrito despues de agregado el product: \n", cart)
            /* this.updatecart(cart, idCart) */
            const cartUpdated = await CartsModel.updateOne(
                { _id: idCart },
                { $set: { products: cart[0].products } }
            )
            return cartUpdated
        }


    }

    async deleteProductByCart(idCart, idProd) {
        const cart = await CartsModel.find({ _id: idCart })

        let founded = false
        let cartUpdated

        for (let i = 0; i < cart[0].products.length; i++) {
            if (cart[0].products[i].product.toString() === idProd) {

                /* productDeleted = cart[0].products[i] */
                cart[0].products.splice(i, 1)
                founded = true

                cartUpdated = await CartsModel.updateOne(
                    { _id: idCart },
                    { $set: { products: cart[0].products } }
                )
            }
        }

        return cartUpdated
    }

    async createCart() {
        const cartCreated = await CartsModel.create({})
        return cartCreated
    }

    async updateAllProductsOnCart(id, products) {

        const cartUpdated = await CartsModel.updateOne(
            { _id: id },
            { $set: { products: products } }
        )
        return cartUpdated

    }

    async updateQuantity(idCart, idProduct, quantity) {

        const cart = await CartsModel.find({ _id: idCart })

        let founded = false

        for (let i = 0; i < cart[0].products.length; i++) {
            if (cart[0].products[i].product.toString() === idProduct) {

                cart[0].products[i].quantity = quantity
                founded = true

                break
            }
        }

        if (founded) {
            const cartUpdated = await CartsModel.updateOne(
                { _id: idCart },
                { $set: { products: cart[0].products } }
            )
            return cartUpdated
        }
        else {

            const cartUpdated = undefined
            return cartUpdated
        }

    }
    
    async deleteAllProductsOnCart(id) {
        const cartUpdated = await CartsModel.updateOne(
            { _id: id },
            { $set: { products: [] } }
        )
        return cartUpdated
    }
}

export const cartService = new CartService()