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
// Actualiza pedido mediante el id y se agrega el estatus del pedido
pedidosRouter.put('/actualizar-pedido', token.validateToken, pedidosController.actualizarPedido);
// Estatus de pedido por id
pedidosRouter.get('/estatus-pedido/:idPedido', token.validateToken, pedidosController.getEstatusPedidoById);
// Historial de movimientos por id usuario
pedidosRouter.get('/historial-movimientos/:idUsuario', token.validateToken, pedidosController.getHistorialMovimientosByUsuario);
// Devuelve el listado de comentarios asociados a los pedidos
pedidosRouter.get('/comentarios', token.validateToken, pedidosController.getComentarios);
// Crea el comentario del usuario en base a la experiencia del pedido
pedidosRouter.post('/crear-comentario', token.validateToken, pedidosController.crearComentarioPedido);
// Devuelve las configuraciones del sistema
pedidosRouter.get('/configuraciones', token.validateToken, pedidosController.getConfiguraciones);

export default pedidosRouter;
