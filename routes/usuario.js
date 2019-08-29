import routerx from 'express-promise-router';
import usuarioController from '../controllers/UsuarioController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/create', auth.verifyAdministrador, usuarioController.create);
router.get('/findbyid/:id', auth.verifyAdministrador, usuarioController.findById);
router.get('/findall', auth.verifyAdministrador, usuarioController.findAll);
router.put('/update/:id', auth.verifyAdministrador, usuarioController.update);
router.delete('/remove/:id', auth.verifyAdministrador, usuarioController.remove);
router.post('/login', usuarioController.login);

export default router;