import routerx from 'express-promise-router';
import usuarioRouter from './usuario';

const router = routerx();

router.use('/usuario', usuarioRouter);

export default router;