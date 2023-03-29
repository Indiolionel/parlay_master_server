import { Request, Response } from 'express';
import { PartidosService } from '../services/partidos.services';


export class PartidosController {

    
    constructor () {}

    public static async create (req: Request, res: Response) {
        const created = await PartidosService.create(req.body);

		res.status(created.success ? 201 : 400).send(created);
    }

    public static async getAll(req: Request, res: Response) {
        const partidos = await PartidosService.getAll();

		res.status(partidos.success ? 200 : 400).send(partidos);
    }

    public static async getById(req: Request, res: Response) {
        const user = await PartidosService.getById(+req.params.id);

        res.status(user.success ? 200 : 400).send(user);
    }
    

    public static async delete(req: Request, res: Response) {
        
        const deleted = await PartidosService.deleteById(+req.params.id)

        res.status(deleted.success ? 200 : 404).send(deleted);
    }
    

}