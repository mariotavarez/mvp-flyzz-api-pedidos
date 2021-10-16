// Server
import Server from "./classes/server";
// Enviroment
import { SERVER_PORT } from "./global/enviroment";
// Routes
import autenticacionRouter from "./routes/autenticacion-route";
import usuariosRouter from "./routes/usuarios-route";
import categoriasRouter from "./routes/categorias-route";
import productosRouter from "./routes/productos-route";
import pedidosRouter from "./routes/pedidos-route";
import bannersRouter from "./routes/banners-route";
import usuariosControlRouter from "./routes/control/usuarios-control-route";
import autenticacionControlRouter from "./routes/control/autenticacion-control-route";
// Body Parser
import bodyParser from 'body-parser';
// Cors
import cors from 'cors';
// Token
import Token from "./middlewares/token";
// Log Server
import LogServer from "./classes/logServer";
// Log4js
import { Logger } from "log4js";
// Log4js
import log4js from 'log4js';
// Server
const server = new Server();
// Inicializa el middleware de autenticacion del Token
const token = new Token();
// Inicializa el log
const logServer = new LogServer();
// Crea el log del servidor
logServer.createLogServer();
// Obtiene la configuracion del log MVP
const logger: Logger = logServer.getLogConfigMVP();
server.app.use(log4js.connectLogger(logger, { level: 'info', format: ':method :url' }));
// Json Body Parser
server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({
  extended: true
}));
// Cors
server.app.use(cors({ credentials: false, origin: '*', methods: ['GET', 'POST', 'DELETE', 'UPDATE'] }));

// Autenticacion Routes
server.app.use('/autenticacion', autenticacionRouter);
// Usuarios Routes
server.app.use('/usuarios', usuariosRouter);
// Categorias Routes
server.app.use('/categorias', token.validateToken, categoriasRouter);
// Productos Routes
server.app.use('/productos', token.validateToken, productosRouter);
// Pedidos Routes
server.app.use('/pedidos', token.validateToken, pedidosRouter);
// Banners Routes
server.app.use('/banners', token.validateToken, bannersRouter);
// Usuarios de control
server.app.use('/control/usuarios', usuariosControlRouter);
// Usuarios de control
server.app.use('/control/autenticacion', autenticacionControlRouter);


// Inicio de servidor
server.start(() => {
  logger.info(`INICIO SERVIDOR: MVP FLYZZ Corriendo en el puerto ${SERVER_PORT}`);
  console.log(`MVP FLYZZ Corriendo en el puerto ${SERVER_PORT}`)
});

