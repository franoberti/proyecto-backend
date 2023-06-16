import { connect } from "mongoose"

export async function connectMongo() {
    try {
        await connect(
            "mongodb+srv://franoberti45:PyoBTzvOuelYsaj7@franocluster.hx1jh7a.mongodb.net/?retryWrites=true&w=majority"
        )
        console.log("plug to mongo!")
    } catch (e) {
        console.log(e)
        throw 'can not connect to the db'
    }
}