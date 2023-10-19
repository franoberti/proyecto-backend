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

    async updateRole(id, newRole) {
        const userUpdated = await Users.updateRole(id, newRole)
        return userUpdated
    }

    async getInactiveSessions() {
        const allSessions = await Users.getAllSessions()
        const sessionsInactive = []
        const fechaActual = new Date();
        for (let i = 0; i < allSessions.length; i++) {

            const dateExpires = new Date(allSessions[i].expires)
            // Calcula la diferencia en milisegundos
            const diferenciaEnMilisegundos = dateExpires - fechaActual;

            // Convierte la diferencia en días
            const diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);

            if (diferenciaEnDias <= 5) {
                const session = JSON.parse(allSessions[i].session)
                session.user.idSession = allSessions[i]._id
                sessionsInactive.push(session.user)
            }

        }
        return sessionsInactive
    }

    async deleteSession(idSesion) {
        const response = await Users.deleteSession(idSesion)
        return response
    }

}

export const usersService = new UsersService()