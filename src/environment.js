import dotenv from 'dotenv'
import { logger } from './middlewares/logger.js'

export const environment = { MODE: process.argv[2] }

if( !process.argv[2] || (process.argv[2] != 'DEV' && process.argv[2] != 'PROD')){
    logger.info('Porfavor indique PROD o DEV')
    process.exit()
}

dotenv.config({
    path: process.argv[2] === 'DEV' ? './.env.development' : './.env.production'
})

environment.PORT = process.env.PORT
environment.MONGO_URL = process.env.MONGO_URL
environment.ADMIN_NAME = process.env.ADMIN_NAME
environment.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
environment.PERSISTENCE = process.env.PERSISTENCE