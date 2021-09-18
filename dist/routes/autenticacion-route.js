"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// Controllers
var autenticacion_controller_1 = __importDefault(require("../controllers/autenticacion-controller"));
var autenticacionRouter = express_1.Router();
var autenticacionController = new autenticacion_controller_1.default();
autenticacionRouter.post('/', autenticacionController.autenticarUsuario);
exports.default = autenticacionRouter;
