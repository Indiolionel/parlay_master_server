import { Request, Response } from 'express';
import { start } from '../scraper/bwin';
import { MlbService } from '../services/mlb.services';


export class MlbController {

    
    constructor () {}

    public static async create (req: Request, res: Response) {
        const data = await start("b%C3%A9isbol-23","mlb-75")

        const created = await MlbService.create(data);

		res.status(created.success ? 201 : 400).send(created);
    }

    public static async getAll(req: Request, res: Response) {
        const partidos = await MlbService.getAll();

		res.status(partidos.success ? 200 : 400).send(partidos);
    }

    public static async editarResumen(req: Request, res: Response) {
        const { partido, resumen } = req.body
        const partidos = await MlbService.editarResumen(partido, resumen);

        res.status(partidos.success ? 200 : 400).send(partidos);
    }

    public static async editarPick(req: Request, res: Response) {
        const { partido, pick } = req.body
        const partidos = await MlbService.editarPick(partido, pick);

        res.status(partidos.success ? 200 : 400).send(partidos);
    }




    public static async delete(req: Request, res: Response) {
        
        const deleted = await MlbService.deleteAll(+req.params.id)

        res.status(deleted.success ? 200 : 404).send(deleted);
    }
    

}