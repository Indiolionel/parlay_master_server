import { Router } from 'express';
import { UserController } from '../controllers/user/user.controllers';



const router = Router();

router.get('/', UserController.getAll);
router.post('/create',UserController.create)
router.post('/login',UserController.login)
router.get('/confirmar/:token', UserController.confirmarUsuario);

export default router;
