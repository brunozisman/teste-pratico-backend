import mongoose, { isObjectIdOrHexString } from "mongoose";
import { IUserService } from "../interfaces/IUserService";
import { UserModel } from "../models/UserModel";


export class MemoryDatabaseService implements IUserService
{
    user: UserModel
    users: UserModel[] = []
    usersCreated = 0

    async create(user: UserModel): Promise<UserModel | null> {
        try {
            this.user = user;
    
            if(!this.user)
                throw new Error("Failed to create user in memory.")
    
            this.users.push(user)
            this.usersCreated++
    
            return this.user
            
        } catch (error) {
            return null
        }
    }

    async findAll(): Promise<UserModel[] | null> {
        try {
            if(!this.addedToMemory())
                throw new Error("Not added all to memory");    
            
            return this.users
            
        } catch (error) {
            return null
        }
    }

    async findById(id: any): Promise<UserModel | null> {

        try {
            const userWithId = this.users.find(item => {if(item._id == id) return item})
    
            if(!userWithId)
                throw new Error("User not found in memory")
    
            this.user = userWithId
            return this.user            
        } catch (error) {
            return null
        }
    }

    async update(user: UserModel, id: any): Promise<UserModel | null> {
        try {            
            const userIndex = this.users.findIndex(item => item._id == id);
    
            if(userIndex == undefined)
                throw new Error("User not found in memory")
    
            this.users[userIndex] = {...this.users[userIndex], ...user}
    
            this.user = this.users[userIndex]
            
            return this.user
            
        } catch (error) {
            return null
        }
    }
    
    async delete(id: any): Promise<UserModel | null> {
        try {
            const userIndex = this.users.findIndex(item => item._id == id);
            const removedUser = this.users.splice(userIndex, 1)
            this.user = removedUser[0]
            return this.user
        } catch (error) {
            return null
        }
    }
    
    async addAllToMemory(users: UserModel[]): Promise<UserModel[] | null>{
        const newUsers = users.map(item =>  {  

            return {...item, _id: item._id.toHexString()}
        })
        
        this.users = newUsers

        return this.users
    }

    public addedToMemory(): boolean
    {
        return this.users.length != this.usersCreated;
    }
}