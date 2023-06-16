//@ts-check
import { Schema, model } from "mongoose";

export const CartsModel = model(
    "carts", /* Nombre de la collection donde se va a hacer el AMBC (o CRUD por sus siglas en ingles) */
    
    
    new Schema({ /* El Schema lo que hace es definir los campos que tiene la coleccion. En el create y update obliga a seguir esta arq */
        products: { 
            type: [
                {
                    product: {
                        type: Schema.Types.ObjectId,
                        ref: 'products'
                    },
                    quantity: {type: Number}
                }
            ], 
            default: []
        },
    })
)
