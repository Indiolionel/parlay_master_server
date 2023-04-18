import { NextFunction, response, request } from "express";

const esSuperAdminRol = (req: any, res = response, next: NextFunction) => {

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
}

const esAdminRole = (req: any, res = response, next: NextFunction) => {

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
}


const tieneRol = (...rol: any) => {
    return (req: any, res = response, next: NextFunction) => {

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
    }
}

export {
    esSuperAdminRol,
    esAdminRole,
    tieneRol
}