import { Carts } from "../DAO/carts.factory.js"

class CartService {

    async getAllCarts() {
        const carts = await Carts.getAll()
        return carts
    }

    async getCartById(id) {
        const cart = await Carts.getById(id)
        return cart
    }

    async addProductByCart(idCart, idProduct) {

        const cart = await Carts.getById(idCart)

        let founded = false

        for (let i = 0; i < cart[0].products.length; i++) {
            if (cart[0].products[i].product.toString() === idProduct) {
                cart[0].products[i].quantity += 1
                founded = true
                break
            }
        }

        if (founded) {
            const cartUpdated = await Carts.updateOneProductCart(idCart, cart)
            return cartUpdated
        }
        else {
            cart[0].products.push({ "product": idProduct, "quantity": 1 })

            console.log("carrito despues de agregado el product: \n", cart)
            const cartUpdated = await Carts.updateOneProductCart(idCart, cart)
            return cartUpdated
        }

    }

    async deleteProductByCart(idCart, idProd) {
        const cart = await Carts.getById(idCart)

        let founded = false
        let cartUpdated

        for (let i = 0; i < cart[0].products.length; i++) {

            if (cart[0].products[i].product._id.toString() === idProd) {
                cart[0].products.splice(i, 1)
                founded = true
                
                cartUpdated = await Carts.updateOneProductCart(idCart, cart)
            }
        }

        return cartUpdated
    }

    async createCart() {
        const cartCreated = await Carts.createCart()
        return cartCreated
    }

    async updateAllProductsOnCart(idCart, products) {

        const cartUpdated = await Carts.updateAllProducts(idCart, products)
        return cartUpdated

    }

    async updateQuantity(idCart, idProduct, quantity) {

        const cart = await Carts.getById(idCart)

        let founded = false

        for (let i = 0; i < cart[0].products.length; i++) {
            if (cart[0].products[i].product._id.toString() === idProduct) {

                cart[0].products[i].quantity = quantity
                founded = true

                break
            }
        }

        if (founded) {
            const cartUpdated = await Carts.updateOneProductCart(idCart, cart)
            return cartUpdated
        }
        else {
            const cartUpdated = undefined
            return cartUpdated
        }

    }

    async deleteAllProductsOnCart(idCart) {
        const cartUpdated = await Carts.updateAllProducts(idCart, [])
        return cartUpdated
    }
}

export const cartService = new CartService()