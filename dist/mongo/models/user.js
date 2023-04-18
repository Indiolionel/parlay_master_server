"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
});
exports.default = (0, mongoose_1.model)('User', userSchema);
