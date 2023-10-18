import { UsersModel } from "../DAO/mongo/models/users.model.js"
import { Users } from "../DAO/users.factory.js"


class UsersService {

    async getAllUsers() {
        const users = await Users.getAllUsers()
        return users
    }

    async deleteUser(id) {
        const userDeleted = await Users.deleteUser(id)
        return userDeleted
    }

    async updateRole(id, newRole){
        const userUpdated = await Users.updateRole(id, newRole)
        return userUpdated
    }

}

export const usersService = new UsersService()