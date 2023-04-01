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
exports.MlbController = void 0;
const mlb_services_1 = require("../services/mlb.services");
class MlbController {
    constructor() { }
    // public static async create (req: Request, res: Response) {
    //     const data = await start("b%C3%A9isbol-23","mlb-75")
    //     const created = await MlbService.create(data);
    // 	res.status(created.success ? 201 : 400).send(created);
    // }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const partidos = yield mlb_services_1.MlbService.getAll();
            res.status(partidos.success ? 200 : 400).send(partidos);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield mlb_services_1.MlbService.deleteAll(+req.params.id);
            res.status(deleted.success ? 200 : 404).send(deleted);
        });
    }
}
exports.MlbController = MlbController;
