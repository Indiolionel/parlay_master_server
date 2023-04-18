"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const nhlSchema = new mongoose_1.Schema({
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
    },
    resumen: String,
    pick: []
});
exports.default = (0, mongoose_1.model)('Nhl', nhlSchema);
