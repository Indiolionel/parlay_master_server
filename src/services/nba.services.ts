
import { NbaInterface } from '../mongo/models/nba'
import nba from '../mongo/models/nba'
import { db } from '../index'
// import { convertirHoraNba } from '../scraper/conversionHora'


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
    //                 updateData,
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

    public static async getAll() {
        console.log("Antes de entrar await nba.find()")
        const partidos = await nba.find();
        console.log("Despues de realizar nba.find()")

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