import { ProductsModel } from './models/products.model.js'

class Products {

    constructor() { }

    async getAll(){
        const products = await ProductsModel.find({})
        return products
    }

    async getAllPaginated(optionQuery, optionSort, limit, page){
        const products = await ProductsModel.paginate( optionQuery ,{ limit: limit || 10, page: page || 1, ...optionSort })
        return products
    }

    async getById(id){
        const product = await ProductsModel.find({ _id: id})
        return product
    }

    async createProduct(title, description, price, thumbnail, code, stock, status, category){
        let createdProduct = await ProductsModel.create({title, description, price, thumbnail, code, stock, status, category})
        return createdProduct
    }

    async updateProduct(product, id){
        const { title, description, price, thumbnail, code, stock, status, category} = product

        const productUpdated = await ProductsModel.updateOne(
            { _id: id },
            { title, description, price, thumbnail, code, stock, status, category }
        )

        return productUpdated
    }

    async deleteProduct(id){
        const productDeleted = await ProductsModel.deleteOne({ _id: id })
        return productDeleted
    }

}

export const productsMongo = new Products()