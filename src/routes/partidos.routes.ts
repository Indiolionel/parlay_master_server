
import { Router } from 'express';
import { NbaController } from '../controllers/nba.controllers';
import { NhlController } from '../controllers/nhl.controllers';
import { MlbController } from '../controllers/mlb.controllers';


const router = Router();

//Nba
router.get('/nba', NbaController.getAll);
// router.post('/nba', NbaController.create);
//Nhl
router.get('/nhl', NhlController.getAll);
// router.post('/nhl', NhlController.create);
//Mlb
router.get('/mlb', MlbController.getAll);
// router.post('/mlb', MlbController.create);



export default router;