// Server
import Server from "./classes/server";
// Enviroment
import { SERVER_PORT } from "./global/enviroment";
// Routes
import autenticacionRouter from "./routes/autenticacion-route";
import usuariosRouter from "./routes/usuarios-route";
import categoriasRouter from "./routes/categorias-route";
import productosRouter from "./routes/productos-route";
// Body Parser
import bodyParser from 'body-parser';
// Cors
import cors from 'cors';
// Token
import Token from "./middlewares/token";
// Server
const server = new Server();
// Inicializa el middleware de autenticacion del Token
const token = new Token();

server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({
  extended: true
}));
// Cors
server.app.use(cors({credentials: false, origin: '*', methods: ['GET','POST','DELETE','UPDATE']}));

// Autenticacion Routes
server.app.use('/autenticacion', autenticacionRouter);
// Usuarios Routes
server.app.use('/usuarios', usuariosRouter);
// Categorias Routes
server.app.use('/categorias', token.validateToken, categoriasRouter);
// Productos Routes
server.app.use('/productos', token.validateToken, productosRouter);

// Inicio de servidor
server.start(() => {
	console.log(`MVP FLYZZ Corriendo en el puerto ${SERVER_PORT}`)
});

