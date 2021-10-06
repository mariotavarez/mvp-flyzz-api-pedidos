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
// Crear pedido
pedidosRouter.post('/crear-pedido', token.validateToken, pedidosController.crearPedido);
exports.default = pedidosRouter;
