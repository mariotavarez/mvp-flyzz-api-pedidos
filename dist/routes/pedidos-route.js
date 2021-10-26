"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// Controllers
var pedidos_controller_1 = __importDefault(require("../controllers/pedidos-controller"));
// Token
var token_1 = __importDefault(require("../middlewares/token"));
// Router
var pedidosRouter = express_1.Router();
// Inicializar controller
var pedidosController = new pedidos_controller_1.default();
// Inicializa el middleware de autenticacion del Token
var token = new token_1.default();
// Rutas secundarias
// Devolver pedidos
pedidosRouter.get('/', token.validateToken, pedidosController.getPedidos);
// Crear pedido
pedidosRouter.post('/crear-pedido', token.validateToken, pedidosController.crearPedido);
// Actualiza pedido mediante el id y se agrega el estatus del pedido
pedidosRouter.put('/actualizar-pedido', token.validateToken, pedidosController.actualizarPedido);
// Estatus de pedido por id
pedidosRouter.get('/estatus-pedido/:idPedido', token.validateToken, pedidosController.getEstatusPedidoById);
// Historial de movimientos por id usuario
pedidosRouter.get('/historial-movimientos/:idUsuario', token.validateToken, pedidosController.getHistorialMovimientosByUsuario);
// Crea el comentario del usuario en base a la experiencia del pedido
pedidosRouter.post('/crear-comentario', token.validateToken, pedidosController.crearComentarioPedido);
exports.default = pedidosRouter;
