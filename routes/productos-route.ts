import { Router } from 'express';
// Controllers
import ProductosController from '../controllers/productos-controller';

// Router
const productosRouter = Router();
// Inicializar controller
const productosController = new ProductosController();

// Rutas secundarias
// Devolucion de productos
productosRouter.get('/', productosController.getProductos);

// Devolucion de productos
productosRouter.get('/productos-categoria/:idCategoria', productosController.getProductosByCategoria);

export default productosRouter;
