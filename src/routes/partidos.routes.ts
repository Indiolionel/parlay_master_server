
import { Router } from 'express';
import { NbaController } from '../controllers/nba.controllers';
import { NhlController } from '../controllers/nhl.controllers';
import { MlbController } from '../controllers/mlb.controllers';
import { tieneRol } from '../middlewares/validarRol';
import checkAuth from '../middlewares/checkAuth';


const router = Router();

//Nba
router.get('/nba', NbaController.getAll);
router.post('/nba', NbaController.create);
router.put('/nba/resumen', NbaController.editarResumen);
router.put('/nba/pick', NbaController.editarPick);

//Nhl
router.get('/nhl', NhlController.getAll);
router.post('/nhl', NhlController.create);
router.put('/nhl/resumen', NhlController.editarResumen);
router.put('/nhl/pick', NhlController.editarPick);

//Mlb
router.get('/mlb', MlbController.getAll);
router.post('/mlb', MlbController.create);
router.put('/mlb/resumen', MlbController.editarResumen);
router.put('/mlb/pick', MlbController.editarPick);




export default router;