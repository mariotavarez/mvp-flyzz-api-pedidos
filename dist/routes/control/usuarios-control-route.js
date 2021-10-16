"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// Controllers
var usuarios_control_controller_1 = __importDefault(require("../../controllers/control/usuarios-control-controller"));
// Router
var usuariosRouter = express_1.Router();
// Inicializar controller
var usuariosControlController = new usuarios_control_controller_1.default();
// Rutas secundarias
// Registro
usuariosRouter.post('/registro', usuariosControlController.altaUsuario);
exports.default = usuariosRouter;
