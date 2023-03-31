import mongoose, { Schema, model } from 'mongoose'

export interface MlbInterface extends mongoose.Document {
    local: String,
    visitante: String,
    puntosLocal: Number,
    puntosVisitante: Number,
    hora: String,
    apuestas: {
        handicapLocal: [
            String,
            Number
        ],
        handicapVisitante: [
            String,
            Number
        ],
        puntosAlta: [
            String,
            Number
        ],
        puntosBaja: [
            String,
            Number
        ],
        ganadorLocal: Number,
        ganadorVisitante: Number
    },

}


const mlbSchema = new Schema({
    equipoLocal: { type: String },
    equipoVisitante: { type: String },
    puntosLocal: { type: Number },
    puntosVisitante: { type: Number },
    hora: { type: String },
    date: Date,
    apuestas: {
        handicapLocal: [
            {
                type: String,
                value: Number,
            },
        ],
        handicapVisitante: [
            {
                type: String,
                value: Number,
            },
        ],
        puntosAlta: [
            {
                type: String,
                value: Number,
            },
        ],
        puntosBaja: [
            {
                type: String,
                value: Number,
            },
        ],
        ganadorLocal: { type: Number },
        ganadorVisitante: { type: Number },
    }
})

export default model<MlbInterface>('Mlb', mlbSchema)