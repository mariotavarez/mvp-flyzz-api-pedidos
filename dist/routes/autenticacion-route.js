"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express
var express_1 = require("express");
// Controllers
var autenticacion_controller_1 = __importDefault(require("../controllers/autenticacion-controller"));
// Router
var autenticacionRouter = express_1.Router();
// Inicializar controller
var autenticacionController = new autenticacion_controller_1.default();
// Rutas secundarias
// Iniciar sesion
autenticacionRouter.post('/iniciar-sesion', autenticacionController.autenticarUsuario);
exports.default = autenticacionRouter;
