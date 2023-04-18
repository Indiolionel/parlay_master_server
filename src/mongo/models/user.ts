import mongoose, { Schema, model } from 'mongoose'

export interface UserInterface extends mongoose.Document {
    nombre: String,
    edad: Number,
    email: String,
    password: String,
    pago: Boolean,
    rol: String,
    confirmado: Boolean,
    token: String
}

const userSchema = new Schema({
    nombre: String,
    edad: Number,
    email: { type: String, unique: true },
    password: String,
    pago: Boolean,
    profilePicture: {
        data: Buffer,
        contentType: String
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROL',
        emun: ['SUPER_ADMIN_ROL', 'ADMIN_ROL', 'MODERATOR_ROL', 'USER_ROL']
    },
    confirmado: {
        type: Boolean,
        required: true,
        default: false
    },
    token: {
        type: String,
        require: true
    }


})

export default model<UserInterface>('User', userSchema)