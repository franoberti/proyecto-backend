import { connect } from "mongoose"
import { environment } from "../environment.js"

export default class MongoSingleton{

    static instance

    constructor(){
        this.connectMongo()
    }

    async connectMongo() {
        try {
            await connect(environment.MONGO_URL + "/?retryWrites=true&w=majority")
            console.log("plug to mongo!")
        } catch (e) {
            console.log(e)

            throw 'can not connect to the db'
        }
    }

    static getInstance(){
        if (this.instance){
            console.log('Already Connected!')
            return this.instance
        }
        else{
            this.instance = new MongoSingleton()
            console.log('Connected!');

            return this.instance
        }
    }
}