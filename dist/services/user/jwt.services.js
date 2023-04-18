"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTservice = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt_1 = require("../../config/jwt");
class JWTservice {
    constructor() { }
    //verifica y decodifica el Token recibido
    static verify(token) {
        const decoded = (0, jsonwebtoken_1.verify)(token, jwt_1.jwtConfig.SECRET);
        return decoded;
    }
    //Genera un nuevo token
    static sign(payload) {
        const token = (0, jsonwebtoken_1.sign)(payload, jwt_1.jwtConfig.SECRET, { expiresIn: "1h" });
        return token;
    }
}
exports.JWTservice = JWTservice;
