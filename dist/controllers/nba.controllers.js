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
exports.NbaController = void 0;
const nba_services_1 = require("../services/nba.services");
class NbaController {
    constructor() { }
    // public static async create (req: Request, res: Response) {
    //     const data = await start("baloncesto-7","nba-6004")
    //     const created = await NbaService.create(data);
    // 	res.status(created.success ? 201 : 400).send(created);
    // }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const partidos = yield nba_services_1.NbaService.getAll();
            res.status(partidos.success ? 200 : 400).send(partidos);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield nba_services_1.NbaService.deleteAll(req.params.id);
            res.status(deleted.success ? 200 : 404).send(deleted);
        });
    }
}
exports.NbaController = NbaController;
