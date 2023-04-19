import { Request, Response } from 'express';
import { UserService } from '../../services/user/user.services';



export class UserController {


    constructor() { }


    public static async getAll(req: Request, res: Response) {
        const users = await UserService.getAll();

        res.status(users.success ? 200 : 400).send(users);
    }

    public static async create(req: Request, res: Response) {
        const user = await UserService.create(req.body);

        res.status(user.success ? 200 : 400).send(user);
    }

    public static async login(req: Request, res: Response) {
        const login = await UserService.login(req.body)
        res.status(login.success ? 200 : 404).send(login);
    }

    public static async confirmarUsuario(req: Request, res: Response) {
        const { token } = req.params
        const usuario = await UserService.confirmarUsuario(token)

        res.status(usuario.success ? 200 : 404).send(usuario);
    }

}