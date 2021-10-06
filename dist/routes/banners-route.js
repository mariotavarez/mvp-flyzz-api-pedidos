"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// Controllers
var banners_controller_1 = __importDefault(require("../controllers/banners-controller"));
// Router
var bannersRouter = express_1.Router();
// Inicializar controller
var bannersController = new banners_controller_1.default();
// Rutas secundarias
// Devolucion de banners
bannersRouter.get('/', bannersController.getBanners);
exports.default = bannersRouter;
