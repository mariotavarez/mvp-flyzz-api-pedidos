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
var productos_route_1 = __importDefault(require("./routes/productos-route"));
// Body Parser
var body_parser_1 = __importDefault(require("body-parser"));
// Cors
var cors_1 = __importDefault(require("cors"));
// Token
var token_1 = __importDefault(require("./middlewares/token"));
// Log Server
var logServer_1 = __importDefault(require("./classes/logServer"));
// Server
var server = new server_1.default();
// Inicializa el middleware de autenticacion del Token
var token = new token_1.default();
// Inicializa el log
var logServer = new logServer_1.default();
// Crea el log del servidor
logServer.createLogServer();
// Obtiene la configuracion del log MVP
var logger = logServer.getLogConfigMVP();
// Json Body Parser
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
server.app.use('/categorias', token.validateToken, categorias_route_1.default);
// Productos Routes
server.app.use('/productos', token.validateToken, productos_route_1.default);
// Inicio de servidor
server.start(function () {
    logger.info("INICIO SERVIDOR: MVP FLYZZ Corriendo en el puerto " + enviroment_1.SERVER_PORT);
    console.log("MVP FLYZZ Corriendo en el puerto " + enviroment_1.SERVER_PORT);
});
