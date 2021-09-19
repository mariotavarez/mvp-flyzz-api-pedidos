import { Router } from 'express';
// Controllers
import CategoriasController from '../controllers/categorias-controller';
// Token
import Token from '../middlewares/token';

// Router
const categoriasRouter = Router();
// Inicializar controller
const categoriasController = new CategoriasController();
// Inicializa el middleware de autenticacion del Token
const token = new Token();

// Rutas secundarias
// Devolucion de categorias
categoriasRouter.get('/', token.validateToken, categoriasController.getCategorias);

export default categoriasRouter;
