export default class ProductDTO {
    constructor(product) {
        this.id = product._id.toString()
        this.title = product.title
        this.price = product.price
    }
}