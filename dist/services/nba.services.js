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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NbaService = void 0;
const nba_1 = __importDefault(require("../mongo/models/nba"));
const index_1 = require("../index");
// import { convertirHoraNba } from '../scraper/conversionHora'
class NbaService {
    constructor() { }
    // public static async create(data: any) {
    //     try {
    //         const nbaModelo = await data.map((partido: NbaInterface) => {
    //             const date= convertirHoraNba(partido.hora)
    //             const updateData = {
    //                 equipoLocal: partido.local,
    //                 equipoVisitante: partido.visitante,
    //                 puntosLocal: partido.puntosLocal,
    //                 puntosVisitante: partido.puntosVisitante,
    //                 hora: partido.hora,
    //                 date: date,
    //                 apuestas: partido.apuestas,
    //             };
    //             nba.findOneAndUpdate(
    //                 { equipoLocal: partido.local, equipoVisitante: partido.visitante },
    //                 {...updateData,resumen:"No hay resumen por el momento",pick:'No hay pick por el momento'},
    //                 {upsert: true, new: true}
    //             ).then((user)=>{
    //                 console.log("Usuario actualizado o insertado", user)
    //             }).catch((error)=>{
    //                 console.log("Error al actualizar o intsertar", error)
    //             })
    //             return updateData;
    //         })
    //         return { success: true, data: nbaModelo }
    //     } catch (error) {
    //         console.log({ error })
    //         return { sucess: false, error: 'Hubo un error' };
    //     }
    // }
    static editarResumen(data, resumen) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { equipoLocal, equipoVisitante } = data;
                const partido = yield nba_1.default.findOneAndUpdate({ equipoLocal, equipoVisitante }, { resumen }, { new: true });
                return { success: true, data: partido };
            }
            catch (error) {
                console.error(error);
                return { success: false, data: error };
            }
        });
    }
    static editarPick(data, pick) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { equipoLocal, equipoVisitante } = data;
                const partido = yield nba_1.default.findOneAndUpdate({ equipoLocal, equipoVisitante }, { pick }, { new: true });
                return { success: true, data: partido };
            }
            catch (error) {
                console.error(error);
                return { success: false, data: error };
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const partidos = yield nba_1.default.find();
                return { success: true, data: partidos };
            }
            catch (error) {
                console.error(error);
                return { success: false, data: error };
            }
        });
    }
    static deleteAll(collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield index_1.db.collection(collectionName).drop();
                return { success: true, message: `La colección '${collectionName}' ha sido eliminada correctamente.` };
            }
            catch (error) {
                return { success: false, error };
            }
        });
    }
}
exports.NbaService = NbaService;
