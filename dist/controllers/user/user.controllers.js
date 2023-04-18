"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_services_1 = require("../../services/user/user.services");
class UserController {
    constructor() { }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_services_1.UserService.getAll();
            res.status(users.success ? 200 : 400).send(users);
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_services_1.UserService.create(req.body);
            res.status(user.success ? 200 : 400).send(user);
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const login = yield user_services_1.UserService.login(req.body);
            res.status(login.success ? 200 : 404).send(login);
        });
    }
    static confirmarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            const usuario = yield user_services_1.UserService.confirmarUsuario(token);
            res.status(usuario.success ? 200 : 404).send(usuario);
        });
    }
}
exports.UserController = UserController;
