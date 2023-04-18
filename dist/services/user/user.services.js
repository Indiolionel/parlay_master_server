"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_1 = __importDefault(require("../../mongo/models/user"));
const jwt_services_1 = require("./jwt.services");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const confirmarEmail_1 = require("./confirmarEmail");
class UserService {
    constructor() { }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.find();
                return { success: true, data: users };
            }
            catch (error) {
                console.error(error);
                return { success: false, data: error };
            }
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = data;
                const emailDuplicate = yield user_1.default.findOne({ email });
                if (emailDuplicate)
                    return { sucess: false, error: "El email ya tiene una cuenta creada", code: "auth/email-already-in-use" };
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashPassword = yield bcrypt_1.default.hash(data.password.toString(), salt);
                const token = crypto.randomBytes(20).toString('hex');
                const userData = yield user_1.default.create(Object.assign(Object.assign({}, data), { password: hashPassword, token }));
                const emailNodemailer = (0, confirmarEmail_1.emailRegistro)({
                    email: userData.email,
                    username: userData.nombre,
                    token: userData.token
                });
                return { success: true, data: emailNodemailer };
            }
            catch (error) {
                console.error(error);
                return { success: false, error: 'Hubo un error inesperado' };
            }
        });
    }
    static login(data) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = data;
            try {
                const userData = yield user_1.default.findOne({ email });
                if (!userData)
                    return { sucess: false, error: 'No existe el email registrado', code: "auth/user-not-found" };
                console.log(userData);
                const token = jwt_services_1.JWTservice.sign({ id: userData === null || userData === void 0 ? void 0 : userData.id, email });
                const isMatch = yield bcrypt_1.default.compare(data.password.toString(), (_b = (_a = userData === null || userData === void 0 ? void 0 : userData.password) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '');
                if (!isMatch) {
                    return { sucess: false, error: 'Los datos ingresados son incorrectos', code: "auth/wrong-password" };
                }
                return { success: true, data: { token, email: userData.email, nombre: userData.nombre, pago: userData.pago, rol: userData.rol } };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error inesperado' };
            }
        });
    }
    static confirmarUsuario(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioConfirmar = yield user_1.default.findOne({ token });
            if (!usuarioConfirmar) {
                const error = new Error("Token no válido");
                return { sucess: false, error: error };
            }
            try {
                usuarioConfirmar.confirmado = true;
                usuarioConfirmar.token = "";
                yield usuarioConfirmar.save();
                return ({ success: true, data: usuarioConfirmar });
            }
            catch (error) {
                return { sucess: false, error: "Error inesperado" };
            }
        });
    }
}
exports.UserService = UserService;
