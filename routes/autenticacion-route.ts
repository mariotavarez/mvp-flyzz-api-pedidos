// Express
import { Router, Request, Response } from 'express';
// Controllers
import AutenticacionController from '../controllers/autenticacion-controller';

// Router
const autenticacionRouter = Router();
// Inicializar controller
const autenticacionController = new AutenticacionController();

// Rutas secundarias
// Iniciar sesion
autenticacionRouter.post('/iniciar-sesion', autenticacionController.autenticarUsuario);

export default autenticacionRouter;
