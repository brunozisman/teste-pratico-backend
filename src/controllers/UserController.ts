import { Request, Response } from "express";
import { DatabaseService } from "../services/DatabaseService";

const userService = new DatabaseService();

class UserController {
    public async index(req: Request, res: Response): Promise<Response> {
        try {
            const users = await userService.findAll()

            return res.status(200).json(users)            
        } catch (error) {
            return res.status(500).json("Internal error")
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const user = await userService.create(req.body);        
            if(!user)
                return res.status(422).json({message: "User already exist."})
            return res.status(201).json(user);            
        } catch (error) {
            return res.status(500).json({error: "Internal error"})
        }
    }

    public async show(req: Request, res: Response): Promise<Response> {
        try {
            const {id} = req.params

            const user = await userService.findById(id)

            if(!user)
                return res.status(422).json({message: "Failed to update."})

            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({error: "Internal error"})
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const {id} = req.params
            const user = await userService.update(req.body, id)

            if(!user)
                res.status(422).json({message: "Failed to update"})

            return res.status(200).json()
        } catch (error) {
            return res.status(500).json({error: "Internal error"})
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const {id} = req.params
            const user = await userService.delete(id)

            if(!user)
                return res.status(422).json({message: "Failed to delete"})

            return res.status(200).json(user)

        } catch (error) {
            return res.status(500).json({error: "Internal error"})
        }
    }
}

export default new UserController()
