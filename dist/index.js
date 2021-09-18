"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Server
var server_1 = __importDefault(require("./classes/server"));
// Enviroment
var enviroment_1 = require("./global/enviroment");
// Routes
var autenticacion_route_1 = __importDefault(require("./routes/autenticacion-route"));
var usuarios_route_1 = __importDefault(require("./routes/usuarios-route"));
var categorias_route_1 = __importDefault(require("./routes/categorias-route"));
// Body Parser
var body_parser_1 = __importDefault(require("body-parser"));
// Cors
var cors_1 = __importDefault(require("cors"));
// Server
var server = new server_1.default();
server.app.use(body_parser_1.default.json());
server.app.use(body_parser_1.default.urlencoded({
    extended: true
}));
// Cors
server.app.use(cors_1.default({ credentials: false, origin: '*', methods: ['GET', 'POST', 'DELETE', 'UPDATE'] }));
// Autenticacion Routes
server.app.use('/autenticacion', autenticacion_route_1.default);
// Usuarios Routes
server.app.use('/usuarios', usuarios_route_1.default);
// Categorias Routes
server.app.use('/categorias', categorias_route_1.default);
// Inicio de servidor
server.start(function () {
    console.log("MVP FLYZZ Corriendo en el puerto " + enviroment_1.SERVER_PORT);
});
