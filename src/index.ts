import express, { Request, Response } from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import partidosRoutes from './routes/partidos.routes'
import mongoose from 'mongoose'
import { MongoClientOptions } from 'mongodb'

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



server.use(express.json());
server.use(cors());

server.use('/partidos', partidosRoutes);

server.get('/health', (req:Request,res:Response)=>{
    res.send("Hola")
} );


server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})

export default server;