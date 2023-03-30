export interface Partido {
    local: string;
    visitante: string;
    puntosLocal: string;
    puntosVisitante: string;
    hora: string;
    apuestas: {
        handicapLocal: string[];
        handicapVisitante: string[];
        puntosAlta: string[];
        puntosBaja: string[];
        ganadorLocal: string;
        ganadorVisitante: string;
    }
}