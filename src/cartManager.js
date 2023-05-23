//@ts-check
import fs from "fs"

class CartManager {

    constructor() {
        this.carts = [];
        this.path = "./carritos.json";

        if(!fs.existsSync(this.path)){
            const cartsString = JSON.stringify(this.carts)
            fs.writeFileSync(this.path, cartsString)
        }
        else{
            const cartsString= fs.readFileSync(this.path, "utf-8");
            const carts = JSON.parse(cartsString);
            this.carts = carts
        }

        if(this.carts.length > 0){
            const lastIndex = this.carts.length - 1
            const lastCart = this.carts[lastIndex]
            this.cartsIdCounter = lastCart.id
        }
        else{
            this.cartsIdCounter = 0
        }
        
    }


    getCarts() {
        return this.carts
    }

    getCartById(id) {
        const found = this.carts.find(cart => cart.id == id)
        if (found) {
            return found
        }
        else {
            throw new Error('Not Found')
        }
    }

    addCart(cart) {
        //Genera el Id 
        const id = this.cartsIdCounter + 1

        //Crea el nuevo carrito
        const newCart = { ...cart, id }
        this.carts.push(newCart)
        const cartsString = JSON.stringify(this.carts)
        fs.writeFileSync(this.path, cartsString)

    }

    addProductByCart(idCart, idProduct){
        let cart = this.getCartById(idCart)
        let founded = false

        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].product == idProduct){
                cart.products[i].quantity += 1
                founded = true
            }
        }

        if (founded){
            this.updatecart(cart, idCart)
        }
        else{
            cart.products.push({"product": idProduct, "quantity": 1})
            this.updatecart(cart, idCart)
        }
    }

    updatecart(cart, id){

        const index = this.carts.findIndex(cart => cart.id == id)

        if(index != -1){

            this.carts[index].products = cart.products || this.carts[index].products;

            const cartsString = JSON.stringify(this.carts)
            fs.writeFileSync(this.path, cartsString)
        
        }
        else{
            throw new Error('Error: El carrito buscado para actualizar no existe');
        }
    }

    deleteCart(id){
        const newCarts = this.carts.filter(cart => cart.id != id)
        this.carts = newCarts
        const cartsString = JSON.stringify(this.carts)
        fs.writeFileSync(this.path, cartsString)
        return this.carts
    }

}


export default CartManager
