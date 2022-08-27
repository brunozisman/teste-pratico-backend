import mongoose, {Schema} from 'mongoose'
import { UserModel } from '../models/UserModel'

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    phone: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
})

export default mongoose.model<UserModel>('User', UserSchema)
