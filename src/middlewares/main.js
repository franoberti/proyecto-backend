export function checkUser(req, res, next) {
    
    if(req.session.user){
        return next()
    }
    return res.status(401).render('login-form')
}

export function checkLogIn(req, res, next) {
    if(req.session.user){
        return next()
    }
    return res.status(401).render('login-form')
}

export function checkAdmin(req, res, next) {
    console.log(req)
    if(req.session && req.session.user && req.session.user.isAdmin == true){
        return next()
    }
        return res.status(403).render('error-page',  {msg: 'No puedes ingresar a esta seccion ya que no eres Administrador'})

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