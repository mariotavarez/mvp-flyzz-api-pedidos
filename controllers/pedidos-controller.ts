// Express
import { Request, Response } from "express";
// Services
import PedidosService from "../services/pedidos-services";

export default class PedidosController {

    constructor() { }


    /**
     * @author Mario Tavarez
     * @date 19/10/2021
     * @description Devuelve el listado de pedidos
     * @param res 
     * @returns 
     */
    public async getPedidos(req: Request, res: Response) {
        // Inicializa el servicio de pedidos
        const pedidosService = new PedidosService();
        // Obtiene la respuesta de devolver el listado de pedidos
        const responseGetPedidos = await pedidosService.getPedidos(res);
        // Devuelve la respuesta de devolucion de pedidos
        return responseGetPedidos;
    }


    /**
     * @author Mario Tavarez
     * @date 18/09/2021
     * @description Crea el pedido del usuario y registra un movimiento en la colección de historial de usuarios
     * @param req 
     * @param res 
     * @returns 
     */
    public async crearPedido(req: Request, res: Response) {
        // Inicializa el servicio de pedidos
        const pedidosService = new PedidosService();
        // Obtiene la respuesta de crear pedido
        const responseCrearPedido = await pedidosService.crearPedido(req, res);
        // Devuelve la respuesta de crear pedido
        return responseCrearPedido;

    }

    /**
     * @author Mario Tavarez
     * @date 24/09/2021
     * @description Actualiza el estatus del pedido mediante el id pedido y el estatus que se actualiza
     * @param req 
     * @param res 
     * @returns 
     */
    public async actualizarPedido(req: Request, res: Response) {
        // Inicializa el servicio de pedidos
        const pedidosService = new PedidosService();
        // Obtiene la respuesta de crear pedido
        const responseActualizarPedido = await pedidosService.actualizarEstatusPedidoById(req, res);
        // Devuelve la respuesta de crear pedido
        return responseActualizarPedido;

    }

    /**
     * @author Mario Tavarez
     * @date 23/10/2021
     * @description Devuelve el estatus del pedido mediante el id
     * @param req 
     * @param res 
     * @returns 
     */
    public async getEstatusPedidoById(req: Request, res: Response) {
        // Inicializa el servicio de pedidos
        const pedidosService = new PedidosService();
        // Obtiene la respuesta del estatus del pedido mediante el id
        const responseGetEstatusById = await pedidosService.getEstatusPedidoById(req, res);
        // Devuelve la respuesta del estatus del pedido mediante el id
        return responseGetEstatusById;

    }

    /**
    * @author Mario Tavarez
    * @date 23/10/2021
    * @description Devuelve el historial de movimientos del usuario mediante el id usuario
    * @param req 
    * @param res 
    */
    public async getHistorialMovimientosByUsuario(req: Request, res: Response) {
        // Inicializa el servicio de pedidos
        const pedidosService = new PedidosService();
        // Obtiene la respuesta del historial de movimientos por usuario
        const responseHistorialMovimientosByUsuario = await pedidosService.getHistorialMovimientosByUsuario(req, res);
        // Devuelve la respuesta del historial de movimientos por usuario
        return responseHistorialMovimientosByUsuario;

    }

    /**
    * @author Mario Tavarez
    * @date 28/10/2021
    * @description Devuelve el listado de comentarios asociados a los pedidos
    * @param req 
    * @param res 
    */
    public async getComentarios(req: Request, res: Response) {
        // Inicializa el servicio de pedidos
        const pedidosService = new PedidosService();
        // Obtiene la respuesta de devolucion de comentarios
        const responseComentarios = await pedidosService.getComentarios(req, res);
        // Obtiene la respuesta de devolucion de comentarios
        return responseComentarios;

    }

    /**
    * @author Mario Tavarez
    * @date 24/10/2021
    * @description Crea el comentario del usuario en base a la experiencia del pedido
    * @param req 
    * @param res 
    */
    public async crearComentarioPedido(req: Request, res: Response) {
        // Inicializa el servicio de pedidos
        const pedidosService = new PedidosService();
        // Obtiene la respuesta de crear el comentario del pedido
        const responseCrearComentarioPedido = await pedidosService.crearComentarioPedido(req, res);
        // Devuelve la respuesta de crear el comentario del pedido
        return responseCrearComentarioPedido;

    }

    /**
      * @author Mario Tavarez
      * @date 08/11/2021
      * @description Devuelve las configuraciones del sistema
      * @param req 
      * @param res 
      */
    public async getConfiguraciones(req: Request, res: Response) {
        // Inicializa el servicio de pedidos
        const pedidosService = new PedidosService();
        // Obtiene la respuesta de las configuraciones del sistema
        const responseConfiguraciones = await pedidosService.getConfiguraciones(req, res);
        // Devuelve la respuesta para devolver las configuraciones del sistema
        return responseConfiguraciones;

    }

}