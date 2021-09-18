import { Router } from 'express';
// Controllers
import CategoriasController from '../controllers/categorias-controller';

// Router
const categoriasRouter = Router();
// Inicializar controller
const categoriasController = new CategoriasController();

// Rutas secundarias
// Devolucion de categorias
categoriasRouter.get('/', categoriasController.getCategorias);

export default categoriasRouter;
