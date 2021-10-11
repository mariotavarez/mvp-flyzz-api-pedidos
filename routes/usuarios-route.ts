import { Router } from 'express';
// Controllers
import UsuariosController from '../controllers/usuarios-controller';
// Token
import Token from '../middlewares/token';

// Router
const usuariosRouter = Router();
// Inicializar controller
const usuariosController = new UsuariosController();
// Inicializa el middleware de autenticacion del Token
const token = new Token();

// Rutas secundarias
// Registro
usuariosRouter.post('/registro', usuariosController.altaUsuario);
// Alta de datos iniciales
usuariosRouter.post('/registro-datos-iniciales', token.validateToken, usuariosController.registrarDatosIniciales);
// Devolucion de datos iniciales
usuariosRouter.get('/datos-registro/:idUsuario', token.validateToken, usuariosController.devolverDatosRegistro);
// Actualizacion de datos iniciales
usuariosRouter.put('/actualizar-datos-iniciales', token.validateToken, usuariosController.actualzarDatosRegistro);

export default usuariosRouter;
