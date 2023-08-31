import { connect } from "mongoose"
import { environment } from "../environment.js"
import { logger } from "../middlewares/logger.js"

export default class MongoSingleton{

    static instance

    constructor(){
        this.connectMongo()
    }

    async connectMongo() {
        try {
            await connect(environment.MONGO_URL + "/?retryWrites=true&w=majority")
            logger.info("plug to mongo!")
        } catch (e) {
            logger.error(e)

            throw 'can not connect to the db'
        }
    }

    static getInstance(){
        if (this.instance){
            logger.info('Already Connected!')
            return this.instance
        }
        else{
            this.instance = new MongoSingleton()
            logger.info('Connected!');

            return this.instance
        }
    }
}