import { Request, Response } from 'express';
import { start } from '../scraper/bwin';
import { NhlService } from '../services/nhl.services';


export class NhlController {

    
    constructor () {}

    public static async create (req: Request, res: Response) {
        const data = await start("hockey-sobre-hielo-12","nhl-34")

        const created = await NhlService.create(data);

		res.status(created.success ? 201 : 400).send(created);
    }

    public static async getAll(req: Request, res: Response) {

        const partidos = await NhlService.getAll();

		res.status(partidos.success ? 200 : 400).send(partidos);
    }

    public static async getById(req: Request, res: Response) {
        const user = await NhlService.getById(+req.params.id);

        res.status(user.success ? 200 : 400).send(user);
    }
    

    public static async delete(req: Request, res: Response) {
        
        const deleted = await NhlService.deleteAll(+req.params.id)

        res.status(deleted.success ? 200 : 404).send(deleted);
    }
    

}