import { CartsModel } from "./models/carts.model.js"


class Carts {

    constructor(){}

    async getAll() {
        const carts = await CartsModel.find({}).populate('products.product')
        return carts
    }

    async getById(id) {
        const cart = await CartsModel.find({ _id: id }).populate('products.product')
        return cart
    }

    async updateOneProductCart(idCart, cart){
        const cartUpdated = await CartsModel.updateOne(
            { _id: idCart },
            { $set: { products: cart[0].products } }
        )
        return cartUpdated
    }

    async createCart(){
        const cartCreated = await CartsModel.create({})
        return cartCreated
    }

    async updateAllProducts(idCart, products){
        const cartUpdated = await CartsModel.updateOne(
            { _id: idCart },
            { $set: { products: products } }
        )
        return cartUpdated
    }

}

export const cartsMongo = new Carts()