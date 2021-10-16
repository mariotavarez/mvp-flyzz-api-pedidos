"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// Controllers
var autenticacion_control_controller_1 = __importDefault(require("../../controllers/control/autenticacion-control-controller"));
// Router
var autenticacionControlRouter = express_1.Router();
// Inicializar controller
var autenticacionControlController = new autenticacion_control_controller_1.default();
// Rutas secundarias
// Registro
autenticacionControlRouter.post('/iniciar-sesion', autenticacionControlController.autenticarUsuarioControl);
exports.default = autenticacionControlRouter;
