import { connect } from "mongoose"
import { environment } from "../environment.js"

export async function connectMongo() {
    try {
        await connect( environment.MONGO_URL + "/?retryWrites=true&w=majority" )
        console.log("plug to mongo!")
    } catch (e) {
        console.log(e)
        
        throw 'can not connect to the db'
    }
}