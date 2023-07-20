import { UsersModel } from "../DAO/models/users.model.js"

class UsersService {
    
    async validateCreateUser( name, lastName, email, password) {
        if (!name || !lastName || !email || !password ){
            console.log("Validation Error: missing values")
            throw "VALIDATION ERROR"
        }
        else{
            
            const user = await UsersModel.find({email: email})
            console.log(user)
            
            if(user.length != 0){
                throw "ERROR: El email ingresado ya pertenece a un usuario existente"
            }
        }
    }
    
    async getUsers(email, pass) {
        const userFounded = await UsersModel.find({email: email, password: pass})

        if(userFounded.length === 0){
            throw "ERROR: Incorrect email or password"
        }

        return userFounded
    }

    async getAllUsers() {
        const users = await UsersModel.find({})
        return users
    }

    async createUser(user) {
        
        await this.validateCreateUser(user.name, user.lastName, user.email, user.password)

        const { name, lastName, email, password } = user

        const cartCreated = await UsersModel.create({name, lastName, email, password})
        return cartCreated
    }

}

export const usersService = new UsersService()