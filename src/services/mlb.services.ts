import mlb from '../mongo/models/mlb'
import { db } from '../index'
import { MlbInterface } from '../mongo/models/mlb';
import { convertirHoraMlb } from '../scraper/conversionHora';


export class MlbService {
    constructor() { }


    // public static async create(data: any) {
    //     try {

          
    //         const mlbModelo = await data.map((partido: MlbInterface) => {
    //             const date= convertirHoraMlb(partido.hora)
    //             const updateData = {
    //                 equipoLocal: partido.local,
    //                 equipoVisitante: partido.visitante,
    //                 puntosLocal: partido.puntosLocal,
    //                 puntosVisitante: partido.puntosVisitante,
    //                 hora: partido.hora,
    //                 date: date,
    //                 apuestas: partido.apuestas
    //             ,
    //             };

    //             mlb.findOneAndUpdate(
    //                 { equipoLocal: partido.local, equipoVisitante: partido.visitante },
    //                 updateData,
    //                 {upsert: true, new: true}
    //             ).then((user)=>{
    //                 console.log("Usuario actualizado o insertado", user)
    //             }).catch((error)=>{
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

    public static async getAll() {
        
        const partidos = await mlb.find();
        return { success: true, data: partidos }

    }

   

    public static async deleteAll(collectionName: any) {

        try {
            await db.collection(collectionName).drop()
            return { success: true, message: `La colección '${collectionName}' ha sido eliminada correctamente.` }
        } catch (error) {
            return { success: false, error }
        }
    }


}