"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express
var express_1 = __importDefault(require("express"));
// Enviroment Configuration
var enviroment_1 = require("../global/enviroment");
var Server = /** @class */ (function () {
    function Server() {
        // Inicializar App
        this.app = express_1.default();
        // Inicializar Port
        this.port = enviroment_1.SERVER_PORT;
    }
    /**
     * @author Mario Tavarez
     * @date 11/09/2021
     * @description Recibe un callback, y permite iniciar la 	 * aplicacion en el puerto designado
     */
    Server.prototype.start = function (callback) {
        this.app.listen(this.port, callback);
    };
    return Server;
}());
exports.default = Server;
