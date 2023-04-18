"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieneRol = exports.esAdminRole = exports.esSuperAdminRol = void 0;
const express_1 = require("express");
const esSuperAdminRol = (req, res = express_1.response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }
    const { rol, username } = req.usuario;
    if (rol !== 'SUPER_ADMIN_ROL') {
        return res.status(401).json({
            msg: `${username} no es super administrador - No puede hacer esto`
        });
    }
    next();
};
exports.esSuperAdminRol = esSuperAdminRol;
const esAdminRole = (req, res = express_1.response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }
    const { rol, username } = req.usuario;
    if (rol !== 'ADMIN_ROL') {
        return res.status(401).json({
            msg: `${username} no es administrador - No puede hacer esto`
        });
    }
    next();
};
exports.esAdminRole = esAdminRole;
const tieneRol = (...rol) => {
    return (req, res = express_1.response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }
        if (!rol.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${rol}`
            });
        }
        next();
    };
};
exports.tieneRol = tieneRol;
