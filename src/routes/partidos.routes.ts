
import { Router } from 'express';
import { PartidosController } from '../controllers/partidos.controllers';


const router = Router();

router.get('/', PartidosController.getAll);


export default router;