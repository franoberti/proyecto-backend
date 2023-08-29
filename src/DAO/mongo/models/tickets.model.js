//@ts-check
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const ticketsSchema = new Schema({ /* El Schema lo que hace es definir los campos que tiene la coleccion. En el create y update obliga a seguir esta arq */
    code: { type: String, required: true, max: 100},
    purchase_datetime: { type: Date, required: true, max: 100},
    amount: { type: Number, required: true},
    purchaser: { type: String, required: true, max: 100},
})

ticketsSchema.plugin(mongoosePaginate)

export const TicketsModel = model("tickets", ticketsSchema)
