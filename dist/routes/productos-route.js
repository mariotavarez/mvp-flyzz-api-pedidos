"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// Controllers
var productos_controller_1 = __importDefault(require("../controllers/productos-controller"));
// Router
var productosRouter = express_1.Router();
// Inicializar controller
var productosController = new productos_controller_1.default();
// Rutas secundarias
// Devolucion de productos
productosRouter.get('/', productosController.getProductos);
// Devolucion de productos
productosRouter.get('/productos-categoria/:idCategoria', productosController.getProductosByCategoria);
exports.default = productosRouter;
