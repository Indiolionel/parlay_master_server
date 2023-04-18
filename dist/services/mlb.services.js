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
exports.MlbService = void 0;
const mlb_1 = __importDefault(require("../mongo/models/mlb"));
const index_1 = require("../index");
// import { convertirHoraMlb } from '../scraper/conversionHora';
class MlbService {
    constructor() { }
    // public static async create(data: any) {
    //     try {
    //         const mlbModelo = await data.map((partido: MlbInterface) => {
    //             const date = convertirHoraMlb(partido.hora)
    //             const updateData = {
    //                 equipoLocal: partido.local,
    //                 equipoVisitante: partido.visitante,
    //                 puntosLocal: partido.puntosLocal,
    //                 puntosVisitante: partido.puntosVisitante,
    //                 hora: partido.hora,
    //                 date: date,
    //                 apuestas: partido.apuestas
    //                 ,
    //             };
    //             mlb.findOneAndUpdate(
    //                 { equipoLocal: partido.local, equipoVisitante: partido.visitante },
    //                 { ...updateData, resumen: "No hay resumen por el momento", pick: 'No hay pick por el momento' },
    //                 { upsert: true, new: true }
    //             ).then((user) => {
    //                 console.log("Usuario actualizado o insertado", user)
    //             }).catch((error) => {
    //                 console.log("Error al actualizar o intsertar", error)
    //             })
    //             return updateData;
    //         })
    //         return { success: true, data: mlbModelo }
    //     } catch (error) {
    //         console.log({ error })
    //         return { sucess: false, error: 'Hubo un error' };
    //     }
    // }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const partidos = yield mlb_1.default.find();
                return { success: true, data: partidos };
            }
            catch (error) {
                console.error(error);
                return { success: false, data: error };
            }
        });
    }
    static editarResumen(data, resumen) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { equipoLocal, equipoVisitante } = data;
                const partido = yield mlb_1.default.findOneAndUpdate({ equipoLocal, equipoVisitante }, { resumen }, { new: true });
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
                const partido = yield mlb_1.default.findOneAndUpdate({ equipoLocal, equipoVisitante }, { pick }, { new: true });
                return { success: true, data: partido };
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
exports.MlbService = MlbService;