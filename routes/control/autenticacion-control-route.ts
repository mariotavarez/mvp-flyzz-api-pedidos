import { Router } from 'express';
// Controllers
import AutenticacionControlController from '../../controllers/control/autenticacion-control-controller';

// Router
const autenticacionControlRouter = Router();
// Inicializar controller
const autenticacionControlController = new AutenticacionControlController();

// Rutas secundarias
// Registro
autenticacionControlRouter.post('/iniciar-sesion', autenticacionControlController.autenticarUsuarioControl);

export default autenticacionControlRouter;
