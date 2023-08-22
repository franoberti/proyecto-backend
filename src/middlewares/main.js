export function checkUser(req, res, next) {
    if(req.session.email){
        return next()
    }
    return res.status(401).render('error-page')
}

export function checkAdmin(req, res, next) {
    if(req.session.email && req.session.admin == true){
        return next()
    }
    return res.status(403).render('error-page')
}

export function validateCreateProduct(req, res, next) {
    const {title, description, price, thumbnail, code, stock, status, category} = req.body

    if (!title || !description || !price || !thumbnail || !code || !stock || !status || !category ){
        console.log("Validation Error: missing values")
        return res.status(500).json({
            status: "error",
            msg: "Validation ERROR: Missing Values",
            data: {}
        })
    }
    else{
        return next()
    }
}

export function validateUpdateProduct(req, res, next) {
    
    const id = req.params.pid
    const {title, description, price, thumbnail, code, stock, category} = req.body

    if (!title || !description || !price || !thumbnail || !code || !stock || !category || !id) {
        console.log("Validation Error: missing values")
        return res.status(500).json({
            status: "error",
            msg: "Validation ERROR: missing values",
            data: {}
        })
    }
    else{
        return next()
    }
}

export function validateId(req, res, next) {
    
    const id = req.params.pid
    if (!id) {
        console.log("Validation Error: Invalid ID")
        return res.status(500).json({
            status: "error",
            msg: "Validation ERROR: Invalid ID",
            data: {}
        })
    }
    else{
        return next()
    }
}