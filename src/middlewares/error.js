import EErrors from "../services/errors/enums.js";

export default(error, req, res, next) => {
    console.log(error.cause)

    switch (error.code) {
        case EErrors.ROUTING_ERROR:
            res
                .status(404)
                .send({ status: 'error', error: error.name, cause: error.cause })
            break;
        case EErrors.INVALID_TYPES_ERROR:
            res
                .status(400)
                .send({ status: 'error', error: error.name, cause: error.cause })
            break;
        case EErrors.DATABASES_READ_ERROR:
            res
                .status(500)
                .send({ status: 'error', error: error.name, cause: error.cause })
            break;
        case EErrors.MONGO_CONNECTION_ERROR:
            res
                .status(500)
                .send({ status: 'error', error: error.name, cause: error.cause })
            break;
        default:
            res
                .status(500)
                .send({status: 'error', error: "Unhandled Error"})
            break;
            break;
    }
}