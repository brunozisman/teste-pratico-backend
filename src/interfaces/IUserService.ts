import { UserModel } from "../models/UserModel";

export interface IUserService {
    create(user: UserModel): Promise<UserModel | null>
    findAll(): Promise<UserModel[] | null>
    findById(id: any): Promise<UserModel | null>
    update(user: UserModel, id: any): Promise<UserModel | null>
    delete(id: any): Promise<UserModel | null>
}