import { Router } from 'express';
// Controllers
import PedidosController from '../controllers/pedidos-controller';
// Token
import Token from '../middlewares/token';

// Router
const pedidosRouter = Router();
// Inicializar controller
const pedidosController = new PedidosController();
// Inicializa el middleware de autenticacion del Token
const token = new Token();

// Rutas secundarias
// Devolver pedidos
pedidosRouter.get('/', token.validateToken, pedidosController.getPedidos);
// Crear pedido
pedidosRouter.post('/crear-pedido', token.validateToken, pedidosController.crearPedido);
// Estatus de pedido por id
pedidosRouter.get('/estatus-pedido/:idPedido', token.validateToken, pedidosController.getEstatusPedidoById);

export default pedidosRouter;
