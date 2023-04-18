import { Request, Response } from 'express';
// import { start } from '../scraper/bwin';
import { NbaService } from '../services/nba.services';


export class NbaController {

    
    constructor () {}

    // public static async create (req: Request, res: Response) {
    //     const data = await start("baloncesto-7","nba-6004")
    //     const created = await NbaService.create(data);

	// 	res.status(created.success ? 201 : 400).send(created);
    // }

    public static async getAll(req: Request, res: Response) {
        const partidos = await NbaService.getAll();

		res.status(partidos.success ? 200 : 400).send(partidos);
    }
    
    public static async editarResumen(req: Request, res: Response) {
        const { partido, resumen } = req.body
        const partidos = await NbaService.editarResumen(partido, resumen);

        res.status(partidos.success ? 200 : 400).send(partidos);
    }

    public static async editarPick(req: Request, res: Response) {
        const { partido, pick } = req.body
        const partidos = await NbaService.editarPick(partido, pick);

        res.status(partidos.success ? 200 : 400).send(partidos);
    }


    public static async delete(req: Request, res: Response) {
        
        const deleted = await NbaService.deleteAll(req.params.id)

        res.status(deleted.success ? 200 : 404).send(deleted);
    }
    

}