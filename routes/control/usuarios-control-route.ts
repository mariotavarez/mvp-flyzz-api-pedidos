import { Router } from 'express';
// Controllers
import UsuariosControlController from '../../controllers/control/usuarios-control-controller';

// Router
const usuariosRouter = Router();
// Inicializar controller
const usuariosControlController = new UsuariosControlController();

// Rutas secundarias
// Registro
usuariosRouter.post('/registro', usuariosControlController.altaUsuario);

export default usuariosRouter;
