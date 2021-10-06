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
// Crear pedido
pedidosRouter.post('/crear-pedido', token.validateToken, pedidosController.crearPedido);

export default pedidosRouter;
