
export function convertirHoraNba(horaStr: any) {
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

    }
    if (horaStr.startsWith('Q2')) {
        return new Date(0, 0, 0, 0, 3);

    }
    if (horaStr.startsWith('Q3')) {
        return new Date(0, 0, 0, 0, 2);

    }
    if (horaStr.startsWith('Q4')) {
        return new Date(0, 0, 0, 0, 1);
    }

    if (horaStr.startsWith('Aho')) {
        return new Date(0, 0, 0, 0, 5);
    }

    if (horaStr.startsWith('Comienza')) {
        const minuto = horaStr.split(' ')
        const minParse = parseInt(minuto[2]) + 5
        return new Date(0, 0, 0, 0, minParse);
    }

    return new Date(0, 0, 0, 0, 0);

}


export function convertirHoraNhl(horaStr: any) {
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
    if (horaStr.startsWith('P1')) {
        return new Date(0, 0, 0, 0, 4);

    }
    if (horaStr.startsWith('P2')) {
        return new Date(0, 0, 0, 0, 3);

    }
    if (horaStr.startsWith('P3')) {
        return new Date(0, 0, 0, 0, 2);

    }
    if (horaStr.startsWith('P4')) {
        return new Date(0, 0, 0, 0, 1);

    }

    if (horaStr.startsWith('Aho')) {
        return new Date(0, 0, 0, 0, 5);
    }

    if (horaStr.startsWith('Comienza')) {
        const minuto = horaStr.split(' ')
        const minParse = parseInt(minuto[2]) + 5
        return new Date(0, 0, 0, 0, minParse);
    }

    return new Date(0, 0, 0, 0, 0);

}


export function convertirHoraMlb(horaStr: any) {
    let partes = horaStr.split(" / ");
    let partesVivo = horaStr.split(" ")
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
    if (partesVivo[3].startsWith('1')) {
        return new Date(0, 0, 0, 0, 8);
    }
    if (partesVivo[3].startsWith('2')) {
        return new Date(0, 0, 0, 0, 7);
    }
    if (partesVivo[3].startsWith('3')) {
        return new Date(0, 0, 0, 0, 6);
    }
    if (partesVivo[3].startsWith('4')) {
        return new Date(0, 0, 0, 0, 5);
    }
    if (partesVivo[3].startsWith('5')) {
        return new Date(0, 0, 0, 0, 4);
    }
    if (partesVivo[3].startsWith('6')) {
        return new Date(0, 0, 0, 0, 3);
    }
    if (partesVivo[3].startsWith('7')) {
        return new Date(0, 0, 0, 0, 2);
    }
    if (partesVivo[3].startsWith('8')) {
        return new Date(0, 0, 0, 0, 1);
    }
    if (horaStr.startsWith('Aho')) {
        return new Date(0, 0, 0, 0, 9);
    }

    if (horaStr.startsWith('Comienza')) {
        const minuto = horaStr.split(' ')
        const minParse = parseInt(minuto[2]) + 9
        return new Date(0, 0, 0, 0, minParse);
    }

    return new Date(0, 0, 0, 0, 0);

}