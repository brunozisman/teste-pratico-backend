import { IUserService } from "../interfaces/IUserService";
import { UserModel } from "../models/UserModel";
import User from "../schemas/User";
import { MemoryDatabaseService } from "./MemoryDatabaseService";

const memoryDb = new MemoryDatabaseService()

export class DatabaseService implements IUserService
{
    async create(user: UserModel): Promise<UserModel | null> {
        try {
            const findUser = await User.findOne(user)
    
            if(findUser)
                throw new Error("User already exist.")
    
            const newUser = await User.create(user);
            memoryDb.create(newUser);

            return newUser;            
        } catch (error) {
            return null
        }
    }
    async findAll(): Promise<UserModel[] | null> {
        try {
            const usersFromMem =  await memoryDb.findAll()
            
            if(usersFromMem)
            {
                return usersFromMem
            }
    
            const users = await User.find().lean()
            memoryDb.addAllToMemory(users)

            return users
            
        } catch (error) {
            return null
        }
    }
    async findById(id: any): Promise<UserModel | null> {
        try {

            const userFromMem = await memoryDb.findById(id)

            if(userFromMem)
            {
                return userFromMem;
            }

            const user = await User.findById(id);

            if(!user)
                throw new Error("User not found.");

            return user;
        } catch (error) {
            return null;
        }
    }
    async update(user: UserModel, id: any): Promise<UserModel | null> {
        try {            
            const userToUpdate = await User.findByIdAndUpdate(id, user).lean()
            
            if(!userToUpdate)
                throw new Error("User not found or wrong parameters")
            
            const userUpdated = memoryDb.update({...user, _id: id}, id)
            return userToUpdate
        } catch (error) {
            return null
        }
    }
    async delete(id: any): Promise<UserModel | null> {
        try {
            const userToDelete = await User.findByIdAndDelete(id)

            memoryDb.delete(id);

            return userToDelete
        } catch (error) {
            return null
        }
    }    
}