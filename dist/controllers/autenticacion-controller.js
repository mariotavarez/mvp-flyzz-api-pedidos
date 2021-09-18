"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var autenticacion_services_1 = __importDefault(require("../services/autenticacion-services"));
var AutenticacionController = /** @class */ (function () {
    function AutenticacionController() {
    }
    /**
     * @author Mario Tavarez
     * @date 16/09/2021
     * @param req
     * @param res
     * @returns
     */
    AutenticacionController.prototype.autenticarUsuario = function (req, res) {
        var autenticacion = req.body;
        var autenticacionService = new autenticacion_services_1.default();
        autenticacionService.autenticarUsuario(req);
        return res.json({ ok: true, mensaje: autenticacion });
    };
    return AutenticacionController;
}());
exports.default = AutenticacionController;
