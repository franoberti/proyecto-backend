import winston from "winston";
import { environment } from "../environment.js";

export const logger = winston.createLogger({
    transports: 
    environment.MODE == 'PROD'?
    [
        new winston.transports.Console({
            level: "info",  // info => warn => error
            format: winston.format.colorize({all: true})
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'error', 
            format: winston.format.simple()
        })
    ]
    :
    [
        new winston.transports.Console({
            level: "debug",  // info => warn => error
            format: winston.format.colorize({all: true})
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'error', // warn => error
            format: winston.format.simple()
        })
    ]


})
