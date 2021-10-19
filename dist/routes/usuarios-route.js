"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// Controllers
var usuarios_controller_1 = __importDefault(require("../controllers/usuarios-controller"));
// Token
var token_1 = __importDefault(require("../middlewares/token"));
// Router
var usuariosRouter = express_1.Router();
// Inicializar controller
var usuariosController = new usuarios_controller_1.default();
// Inicializa el middleware de autenticacion del Token
var token = new token_1.default();
// Rutas secundarias
// Registro
usuariosRouter.post('/registro', usuariosController.altaUsuario);
// Alta de datos iniciales
usuariosRouter.post('/registro-datos-iniciales', token.validateToken, usuariosController.registrarDatosIniciales);
// Devolucion de datos iniciales
usuariosRouter.get('/datos-registro/:idUsuario', token.validateToken, usuariosController.devolverDatosRegistro);
// Actualizacion de datos iniciales
usuariosRouter.put('/actualizar-datos-iniciales', token.validateToken, usuariosController.actualzarDatosRegistro);
// Devuelve todos los usuarios registrados
usuariosRouter.get('/', token.validateToken, usuariosController.getUsuariosRegistrados);
exports.default = usuariosRouter;
