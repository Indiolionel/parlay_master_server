
import { db } from '../index'
import { Partido } from '../interface'


export class PartidosService {
    constructor() { }


    public static async create(data: any) {

        return { success: true, data: "" }
    }

    public static async getAll() {
        const collections = await db.listCollections().toArray();
        const partidos: Partido[] = [];

        for (const coll of collections) {
            if (coll.name.startsWith("NBA-")) {
                const colData = await db.collection(coll.name).find().toArray();
                partidos.push(...colData.map(doc => Object.assign({}, doc, { _id: undefined })))
            }
        }

        function convertirHora(horaStr: any) {
            let partes = horaStr.split(" / ");
            if (partes.length > 1) {
                let meridiano = partes[0];
                let horaMin = partes[1].split(":");
                let hora = parseInt(horaMin[0]);
                let minuto = parseInt(horaMin[1]);
                if (meridiano === "Mañana") {
                    hora = hora + 12;
                }
                return new Date(0, 0, 0, hora, minuto);
            }
            if (horaStr.startsWith('Q1')) {
                return new Date(0, 0, 0, 0, 4);

            } else if (horaStr.startsWith('Q2')) {
                return new Date(0, 0, 0, 0, 3);

            } else if (horaStr.startsWith('Q3')) {
                return new Date(0, 0, 0, 0, 2);

            } else if (horaStr.startsWith('Q4')) {
                return new Date(0, 0, 0, 0, 1);
            }
            else if (horaStr.startsWith('Aho')) {
                return new Date(0, 0, 0, 5);
            }
            else if (horaStr.startsWith('Comienza')) {
                const minuto = horaStr.split(' ')
                const minParse = parseInt(minuto[2]) + 5
                return new Date(0, 0, 0, 0, minParse);
            } else {
                return new Date(0, 0, 0, 0, 0);
            }


        }


        const partidosOrdenados = partidos.sort((a: any, b: any) => +convertirHora(a.hora) - +convertirHora(b.hora));


        return { success: true, data: partidosOrdenados }
    }

    public static async getById(id: any) {
        return { success: true, data: "" }
    }



    public static async deleteById(id: any) {
        return { success: true, data: "" }
    }


}