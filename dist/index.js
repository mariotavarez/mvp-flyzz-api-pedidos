"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Server
var server_1 = __importDefault(require("./classes/server"));
// Enviroment
var enviroment_1 = require("./global/enviroment");
// HTTPS
var https_1 = __importDefault(require("https"));
// File System
var fs_1 = __importDefault(require("fs"));
// Routes
var autenticacion_route_1 = __importDefault(require("./routes/autenticacion-route"));
var usuarios_route_1 = __importDefault(require("./routes/usuarios-route"));
var categorias_route_1 = __importDefault(require("./routes/categorias-route"));
var productos_route_1 = __importDefault(require("./routes/productos-route"));
var pedidos_route_1 = __importDefault(require("./routes/pedidos-route"));
var banners_route_1 = __importDefault(require("./routes/banners-route"));
var usuarios_control_route_1 = __importDefault(require("./routes/control/usuarios-control-route"));
var autenticacion_control_route_1 = __importDefault(require("./routes/control/autenticacion-control-route"));
// Body Parser
var body_parser_1 = __importDefault(require("body-parser"));
// Cors
var cors_1 = __importDefault(require("cors"));
// Token
var token_1 = __importDefault(require("./middlewares/token"));
// Log Server
var logServer_1 = __importDefault(require("./classes/logServer"));
// Log4js
var log4js_1 = __importDefault(require("log4js"));
var path_1 = __importDefault(require("path"));
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
server.app.use(log4js_1.default.connectLogger(logger, { level: 'info', format: ':method :url' }));
// Json Body Parser
server.app.use(body_parser_1.default.json());
server.app.use(body_parser_1.default.urlencoded({
    extended: true
}));
// Cors
server.app.use(cors_1.default({ credentials: false, origin: '*', methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'] }));
// Autenticacion Routes
server.app.use('/autenticacion', autenticacion_route_1.default);
// Usuarios Routes
server.app.use('/usuarios', usuarios_route_1.default);
// Categorias Routes
server.app.use('/categorias', token.validateToken, categorias_route_1.default);
// Productos Routes
server.app.use('/productos', token.validateToken, productos_route_1.default);
// Pedidos Routes
server.app.use('/pedidos', token.validateToken, pedidos_route_1.default);
// Banners Routes
server.app.use('/banners', token.validateToken, banners_route_1.default);
// Usuarios de control
server.app.use('/control/usuarios', usuarios_control_route_1.default);
// Usuarios de control
server.app.use('/control/autenticacion', autenticacion_control_route_1.default);
var sslServer = https_1.default.createServer({
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, 'cert', 'key.pem')),
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, 'cert', 'cert.pem'))
}, server.app);
// Inicio de servidor
server.start(function () {
    logger.info("INICIO SERVIDOR: MVP FLYZZ Corriendo en el puerto " + enviroment_1.SERVER_PORT);
    console.log("MVP FLYZZ Corriendo en el puerto " + enviroment_1.SERVER_PORT);
});
sslServer.listen(enviroment_1.SSL_SERVER_PORT, function () { return console.log('SERVIDOR SSL Corriendo'); });
