import UserDTO from "../DAO/DTO/users.dto.js";
import { logger } from "../middlewares/logger.js";
import { usersService } from "../services/users.service.js";

class UsersController {

    constructor() { }

    async getAll(req, res) {
        try {

            const users = await usersService.getAllUsers()
            const usersDTO = users.map((prod) => {
                const usersDTO = new UserDTO(prod)
                return usersDTO
            })

            if (users.length === 0) {
                return res.status(500).json({
                    status: "success",
                    msg: "No hay usuarios registrados",
                    data: {}
                })
            }
            else {
                return res.status(200).json({
                    status: "success",
                    msg: "Users",
                    data: usersDTO
                })
            }
        } catch (error) {
            logger.error(error)
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                data: {}
            })
        }
    }

    async deleteUser(req, res) {

        try {

            const id = req.params.uid

            const userDeleted = await usersService.deleteUser(id)

            return res.status(200).json({
                status: "success",
                msg: "producto eliminado con exito",
                data: userDeleted
            })
        }
        catch (error) {
            logger.error(error)
            return res.status(500).json({
                status: "error",
                msg: "Something went wrong :(",
                data: {}
            })
        }

    }

    async updateRoleUser(req, res) {
        try {

            const id = req.params.uid
            const newRole = req.body.role

            const userUpdated = await usersService.updateRole(id, newRole)

            return res.status(200).json({
                status: "success",
                msg: "producto eliminado con exito",
                data: userUpdated
            })
        }
        catch (error) {
            logger.error(error)
            return res.status(500).json({
                status: "error",
                msg: "Something went wrong :(",
                data: {}
            })
        }
    }

    async getUsersInactive(req, res) {
        try {
            const sessionsInactive = await usersService.getInactiveSessions()
            
            console.log(sessionsInactive);

            return res.status(200).json({
                status: "success",
                msg: "usuarios inactivos encontrados con exito",
                data: sessionsInactive
            })
        }
        catch (error) {
            logger.error(error)
            return res.status(500).json({
                status: "error",
                msg: "Something went wrong :(",
                data: {}
            })
        }
    }

}

export const usersController = new UsersController()