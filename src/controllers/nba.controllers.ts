import { Request, Response } from 'express';
import { start } from '../scraper/bwin';
import { NbaService } from '../services/nba.services';


export class NbaController {

    
    constructor () {}

    public static async create (req: Request, res: Response) {
        const data = await start("baloncesto-7","nba-6004")
        const created = await NbaService.create(data);

		res.status(created.success ? 201 : 400).send(created);
    }

    public static async getAll(req: Request, res: Response) {
        const partidos = await NbaService.getAll();

		res.status(partidos.success ? 200 : 400).send(partidos);
    }

    public static async getById(req: Request, res: Response) {
        const {local,visitante}=req.query
        const user = await NbaService.getById({local,visitante});

        res.status(user.success ? 200 : 400).send(user);
    }
    

    public static async delete(req: Request, res: Response) {
        
        const deleted = await NbaService.deleteAll(req.params.id)

        res.status(deleted.success ? 200 : 404).send(deleted);
    }
    

}