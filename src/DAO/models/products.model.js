//@ts-check
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsSchema = new Schema({ /* El Schema lo que hace es definir los campos que tiene la coleccion. En el create y update obliga a seguir esta arq */
    title: { type: String, required: true, max: 100},
    description: { type: String, required: true, max: 100},
    price: { type: Number, required: true},
    code: { type: String, required: true, max: 100},
    stock: { type: Number, required: true, max: 100},
    status: { type: Boolean, required: true, max: 100},
    category: { type: String, required: true, max: 100},
})

productsSchema.plugin(mongoosePaginate)

export const ProductsModel = model("products", productsSchema)
