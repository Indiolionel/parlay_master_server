import pupeeteer from 'puppeteer'
import { load } from 'cheerio'
import { ObjectId } from 'mongodb'
import { Partido } from '../interface'


export const start = async (deporte: string, liga: string) => {
    // const basket = "baloncesto-7"
    // const nba = "nba-6004"
    // const hockey = "hockey-sobre-hielo-12"
    // const nhl = "nhl-34"
    // const beisbol = "béisbol-23"
    // const mlb = "mlb-75"
    const browser = await pupeeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://sports.bwin.com/es/sports/${deporte}/apuestas/norteam%C3%A9rica-9/${liga}`, { waitUntil: 'networkidle0', timeout: 0 });
    await page.waitForSelector('#main-view', { timeout: 60000 });
    const content = await page.content();
    const $ = load(content);

    let id = 0;
    const partidos: Partido[] = await Promise.all($('.composable ms-widget-slot ms-grid div ms-event-group:first-of-type ms-six-pack-event .grid-event-wrapper')
        .toArray()

        .map((element) => {
            const hora = $(element).find('a ms-event-detail ms-event-info ms-event-timer').text();
            const equipos = $(element).find('a ms-event-detail ms-event-name').text();
            const handicap = $(element).find('.grid-group-container div ms-option-group:nth-child(1) ms-option').map((i, el) => $(el).text().trim()).toArray();
            const puntosTotal = $(element).find('.grid-group-container div ms-option-group:nth-child(2) ms-option').map((i, el) => $(el).text().trim()).toArray();
            const ganador = $(element).find('.grid-group-container div ms-option-group:nth-child(3) ms-option').map((i, el) => $(el).text().trim()).toArray()
            const puntosLocal = liga === 'mlb-75' ?
                $(element).find('a ms-grid-scoreboard ms-baseball-scoreboard div:nth-child(2) div:nth-child(1) div div:nth-child(1) ').text()
                : $(element).find('a ms-grid-scoreboard ms-period-game-scoreboard div div:nth-child(1) div div:nth-child(1)').text()
            const puntosVisitante = liga === 'mlb-75' ?
                $(element).find('a ms-grid-scoreboard ms-baseball-scoreboard div:nth-child(2) div:nth-child(2) div div:nth-child(1) ').text()
                : $(element).find('a ms-grid-scoreboard ms-period-game-scoreboard div div:nth-child(2) div div:nth-child(1)').text()

            const equipoArray = equipos.split("@")
            const handicapLocal = handicap[0]?.split(" ")
            const handicapVisitante = handicap[1]?.split(" ")
            const puntosConversionAlta = puntosTotal[0] ? puntosTotal[0].replace('▲ ', '+').split(" ") : [""]
            const puntosConversionBaja = puntosTotal[1] ? puntosTotal[1].replace('▼ ', '-').split(" ") : [""]
            return {
                _id: new ObjectId(),
                local: equipoArray[0]?.trim(),
                visitante: equipoArray[1]?.trim(),
                puntosLocal: puntosLocal,
                puntosVisitante: puntosVisitante,
                hora,
                apuestas: {
                    handicapLocal: handicapLocal,
                    handicapVisitante: handicapVisitante,
                    puntosAlta: puntosConversionAlta,
                    puntosBaja: puntosConversionBaja,
                    ganadorLocal: ganador[0],
                    ganadorVisitante: ganador[1]

                },
            };

        }
        )
    );
    await browser.close();

    console.log("Se guardaron los datos");
    return partidos

}

