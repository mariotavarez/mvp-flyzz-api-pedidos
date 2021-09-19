"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// Controllers
var categorias_controller_1 = __importDefault(require("../controllers/categorias-controller"));
// Router
var categoriasRouter = express_1.Router();
// Inicializar controller
var categoriasController = new categorias_controller_1.default();
// Rutas secundarias
// Devolucion de categorias
categoriasRouter.get('/', categoriasController.getCategorias);
exports.default = categoriasRouter;
