import { Request, Response } from 'express';
// import { start } from '../scraper/bwin';
import { NhlService } from '../services/nhl.services';


export class NhlController {


    constructor() { }

    // public static async create(req: Request, res: Response) {
    //     const data = await start("hockey-sobre-hielo-12", "nhl-34")

    //     const created = await NhlService.create(data);

    //     res.status(created.success ? 201 : 400).send(created);
    // }

    public static async getAll(req: Request, res: Response) {

        const partidos = await NhlService.getAll();

        res.status(partidos.success ? 200 : 400).send(partidos);
    }

    public static async editarResumen(req: Request, res: Response) {
        const { partido, resumen } = req.body
        const partidos = await NhlService.editarResumen(partido, resumen);

        res.status(partidos.success ? 200 : 400).send(partidos);
    }

    public static async editarPick(req: Request, res: Response) {
        const { partido, pick } = req.body
        const partidos = await NhlService.editarPick(partido, pick);

        res.status(partidos.success ? 200 : 400).send(partidos);
    }

    public static async delete(req: Request, res: Response) {

        const deleted = await NhlService.deleteAll(+req.params.id)

        res.status(deleted.success ? 200 : 404).send(deleted);
    }


}