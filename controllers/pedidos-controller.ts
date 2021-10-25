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

}