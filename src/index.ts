import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import partidosRoutes from './routes/partidos.routes'
import mongoose from 'mongoose'
import { MongoClientOptions, Db } from 'mongodb'
import { start } from './scraper/bwin'

const server = express()
dotenv.config();
const port = process.env.PORT || 5000

const url = process.env.URL_MONGO!

mongoose.connect(url!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as MongoClientOptions)

export const db = mongoose.connection

db.on('open',()=>{
  console.log("Conexion exitosa a la base de datos")
})

// export const connectMongo = async () => {
//   try {
//     await connectionPromise;
//     console.log('Conexión exitosa a la base de datos');
//     return mongoose.connection;
//   } catch (err) {
//     console.error('Error al conectar a la base de datos:', err);
//     throw err;
//   }
// };



server.use(express.json());
server.use(cors());

server.use('/partidos', partidosRoutes);
// export const scraper = async () => {
//   const data = await start();
//   return data
// };


server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})

