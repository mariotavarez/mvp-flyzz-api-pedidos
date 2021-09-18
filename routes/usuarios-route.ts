import { Router } from 'express';
// Controllers
import UsuariosController from '../controllers/usuarios-controller';

// Router
const usuariosRouter = Router();
// Inicializar controller
const usuariosController = new UsuariosController();

// Rutas secundarias
// Registro
usuariosRouter.post('/registro', usuariosController.altaUsuario);

export default usuariosRouter;
