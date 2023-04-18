
import { NbaInterface } from '../mongo/models/nba'
import nba from '../mongo/models/nba'
import { db } from '../index'
import { convertirHoraNba } from '../scraper/conversionHora'


export class NbaService {
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

    public static async editarResumen(data: any, resumen: string) {
        try {
            const { equipoLocal, equipoVisitante } = data;
            const partido = await nba.findOneAndUpdate({ equipoLocal, equipoVisitante }, { resumen }, { new: true });
            return { success: true, data: partido }
        } catch (error) {
            console.error(error);
            return { success: false, data: error };
        }
    }

    public static async editarPick(data: any, pick: string) {
        try {
            const { equipoLocal, equipoVisitante } = data;
            const partido = await nba.findOneAndUpdate({ equipoLocal, equipoVisitante }, { pick }, { new: true });
            return { success: true, data: partido }
        } catch (error) {
            console.error(error);
            return { success: false, data: error };
        }
    }

    public static async getAll() {
        try {
            const partidos = await nba.find();
            return { success: true, data: partidos }
        } catch (error) {
            console.error(error)

            return { success: false, data: error }
        }

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