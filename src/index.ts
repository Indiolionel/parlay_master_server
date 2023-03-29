import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import partidosRoutes from './routes/partidos.routes'
import { MongoClient, Db } from 'mongodb'
import { start } from './scraper/bwin'

const server = express()
dotenv.config();
const port = process.env.PORT || 5000

const mongo = new MongoClient(process.env.URL_MONGO!)
async function connect() {
    await mongo.connect();
    // await start(mongo)
    
}
connect();

export const db: Db = mongo.db('Partidos');

// server.get('/', (req, res) => {
//     res.send("hola santi")
// })

server.use(express.json());
server.use(cors());

server.use('/partidos', partidosRoutes);



server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})

