import { Router } from 'express';
// Controllers
import BannersController from '../controllers/banners-controller';

// Router
const bannersRouter = Router();
// Inicializar controller
const bannersController = new BannersController();

// Rutas secundarias
// Devolucion de banners
bannersRouter.get('/', bannersController.getBanners);

export default bannersRouter;
