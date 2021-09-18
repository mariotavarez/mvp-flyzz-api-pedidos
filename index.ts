// Server
import Server from "./classes/server";
// Enviroment
import { SERVER_PORT } from "./global/enviroment";
// Routes
import autenticacionRouter from "./routes/autenticacion-route";
import usuariosRouter from "./routes/usuarios-route";
import categoriasRouter from "./routes/categorias-route";
// Body Parser
import bodyParser from 'body-parser';
// Cors
import cors from 'cors';
// Server
const server = new Server();

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
server.app.use('/categorias', categoriasRouter);

// Inicio de servidor
server.start(() => {
	console.log(`MVP FLYZZ Corriendo en el puerto ${SERVER_PORT}`)
});

